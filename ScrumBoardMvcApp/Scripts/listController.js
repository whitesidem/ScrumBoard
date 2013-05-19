/// <reference path="External/Angular/angular.js" />
/// <reference path="Shared/global.js" />
/// <reference path="models.js" />

// ReSharper disable InconsistentNaming

(function () {

    var app = angular.module("ScrumBoardApp");

    var blah = app.controller("ListController", ["$scope", "$http", "myBoard", "mySockets", "boardData", "$location", function ($scope, $http, myBoard, mySockets, boardData, $location) {

        var currDragtarget = null;
        var $currTarget;


        $scope.addCard = function () {
            $('.addCard').click();
        };

        $scope.loadBoard = function () {
            console.log('selected: ' + $scope.boardcreate.selectableBoardId);
            $location.path('/List').search({ "boardId": $scope.boardcreate.selectableBoardId });
        };

        $scope.isCurrentlyDragging = false;
        $scope.board = myBoard;

        $scope.isCreateListCollapsed = false;
        //        $scope.isCreateListModalCollapsed= false;
        $scope.isDebugCollapsed = true;
        $scope.boardcreate = { selectableBoardId: 1 };


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
                myBoard.addList(list);
            });

        };

        //resolved data from BoardRestService, resolved from routing
        bindBoarddata(boardData);


        //        var populateBoard = function () {

        //            var testBoardId = 1;

        //            if ($.urlParams('isTest')) {
        //                $http.post("api/ScrumBoardRestApi/resetBoardDataById?id=" + testBoardId);
        //            };

        //            $http.get("api/ScrumBoardRestApi/GetAllBoardDataById?id=" + testBoardId).success(function (data) {
        //                if (_(data).isUndefined()) return;
        //                if (_(data.lists).isUndefined()) return;
        //                _(data.lists).each(function (e) {
        //                    var list = SkilzJs.model.list.FactoryCreate(e.Title, e.Id);
        //                    var cards = _(data.cardLists).filter(function (c) { return c.ListId === list.id; });
        //                    _(cards).each(function (e) {
        //                        var card = SkilzJs.model.card.FactoryCreate(e.Title, e.Id);
        //                        list.addCard(card);
        //                    });
        //                    myBoard.addList(list);
        //                });

        //            }); ;
        //        };

        $scope.addListWithNameEvent = function (title, id) {
            var list = SkilzJs.model.list.FactoryCreate(title, id);
            myBoard.addList(list);
        };

        $scope.addCardWithNameEvent = function (listId, title, id) {
            var list = myBoard.getListById(listId);
            var card = SkilzJs.model.card.FactoryCreate(title, id);
            list.addCard(card);
        };

        $scope.uiUpdateCardLocationEvent = function (sourceCardId, targetListId, targetCardId) {
            var sourceCard = myBoard.getCardById(sourceCardId);

            var sourceListId = sourceCard.listId;
            var sourceList = myBoard.getListById(sourceListId);
            sourceList.removeCard(sourceCard);

            var targetList = null;
            if (targetCardId != -1) {
                var targetCard = myBoard.getCardById(targetCardId);
                targetListId = targetCard.listId;
                targetList = myBoard.getListById(targetListId);
                var targetIndex = _(targetList.cards).indexOf(targetCard);
                targetList.addCard(sourceCard, targetIndex);
            } else {
                targetList = myBoard.getListById(targetListId);
                targetList.addCard(sourceCard);
            }
        };


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
            $http.put("api/ScrumBoardRestApi/MoveCard?boardId=" + myBoard.id + "&sourceCardId=" + sourceCardId + "&targetListId=" + targetListId + "&targetCardId=" + targetCardId);
        };


        mySockets.setupSocket($scope);



    } ]);

    //    console.dir(app);
    //    console.dir(blah);

    //app.controller("ListController").run(function() {} );

})();
