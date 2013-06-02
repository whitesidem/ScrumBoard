/// <reference path="External/Angular/angular.js" />
/// <reference path="Shared/global.js" />
/// <reference path="models.js" />

// ReSharper disable InconsistentNaming

(function () {


    angular.module("ScrumBoardApp").controller("ListController", ["$scope", "$http", "CurrentBoard", "BoardSockets", "boardData", "$location", function ($scope, $http, currentBoard, boardSockets, boardData, $location) {

        var currDragtarget = null;
        var $currTarget;

        $scope.addCard = function () {
            $('.addCard').click();
        };


//        $scope.testId = 777;
//        $scope.loadBoard2 = function () {
//            alert($scope.testId);
//        };

//        $scope.loadBoard = function () {
//            console.log('selected: ' + $scope.boardcreate.selectableBoardId);
//            $location.path('/List').search({ "boardId": $scope.boardcreate.selectableBoardId });
//        };

        $scope.isCurrentlyDragging = false;
        $scope.board = currentBoard;

        $scope.isCreateListCollapsed = false;
        $scope.isCreateListModalCollapsed= false;
        $scope.isDebugCollapsed = true;
//        $scope.boardcreate = { selectableBoardId: 1 };

        $scope.setDragging = function (isDragging) {
            $('.listItemScroll').stop();
            //            console.log('SET DRAGGING' + isDragging);
            $scope.isCurrentlyDragging = isDragging;
        };

        $scope.boardMouseMoveEvent = function (e) {

            if ($scope.isCurrentlyDragging === false) {
                //                console.log('BOARDMOUSE');
                return;
            }

            if (e.target !== currDragtarget) {
                $('.listItemScroll').stop();
                currDragtarget = e.target;
                $currTarget = $(currDragtarget);
            }

            var $itemInScrollRegion = $currTarget.closest('.listItemScroll');
            if ($itemInScrollRegion.length == 0) {
                //                console.log('NON DRAG REGION');
                return;
            }

            //console.log('DRAG list or card');

            var $this = $itemInScrollRegion;
            if ($this.length === 0) return;

            //        $('.listItemScroll', $currTarget);
            var $inner = $('.listItem', $this);
            //                console.log($inner.height());
            var h = $inner.height() + 13;
            var offset = $this.offset();
            var position = (e.pageY - offset.top) / $this.height();
            //console.log(position);
            if (position < 0.15) {
                //            console.log('fast top');
                $this.stop().animate({ scrollTop: 0 }, 1000);
            }
            else if (position < 0.33) {
                //            console.log('slow top');
                $this.stop().animate({ scrollTop: 0 }, 5000);
            }
            else if (position > 0.75) {
                //            console.log('slow bottom');
                $this.stop().animate({ scrollTop: h }, 1000);
            }
            else if (position > 0.66) {
                //            console.log('fast bottom');
                $this.stop().animate({ scrollTop: h }, 5000);
            } else {
                //                 console.log('OUTSIDE');
                $this.stop();
            }

        };


        //    $scope.cloneForDrag = function (e) {
        //        var card = e.currentTarget;
        //        console.log(card);
        //        var cloneCard = $.clone(card);
        //        $(cloneCard).addClass('dragClone');
        //        return cloneCard;
        //    };


        var bindBoarddata = function (data) {
            if (_(data).isUndefined()) return;
            if (_(data.lists).isUndefined()) return;
            _(data.lists).each(function (e) {
                var list = SkilzJs.model.list.FactoryCreate(e.Title, e.Id);
                var cards = _(data.cardLists).filter(function (c) { return c.ListId === list.id; });
                _(cards).each(function (e) {
                    var card = SkilzJs.model.card.FactoryCreate(e.Title, e.Id);
                    list.addCard(card);
                });
                currentBoard.addList(list);
            });

        };

        //resolved data from BoardRestService, resolved from routing
        bindBoarddata(boardData);


        $scope.setCurrentCard = function (card) {
            $scope.currentCard = card;
        };


        $scope.dropListenerEvent = function (eDraggable, eDroppable) {
            var sourceCardId = eDraggable.data('cardid');
            var targetCardId = eDroppable.data('cardid');
            var targetListId = eDroppable.data('listid');
            _triggerChangeCardLocation(sourceCardId, targetCardId, targetListId);
        };

        var _triggerChangeCardLocation = function (sourceCardId, targetCardId, targetListId) {
            //              console.log("from " + sourceCardId + " to " + targetCardId);
            $http.put("api/ScrumBoardRestApi/MoveCard?boardId=" + currentBoard.id + "&sourceCardId=" + sourceCardId + "&targetListId=" + targetListId + "&targetCardId=" + targetCardId);
        };

    } ]);


    //app.controller("ListController").run(function() {} );

})();
