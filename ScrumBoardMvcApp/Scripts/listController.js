/// <reference path="External/Angular/angular.js" />
/// <reference path="Shared/global.js" />
/// <reference path="models.js" />

// ReSharper disable InconsistentNaming

SkilzJs.namespace('controller');

SkilzJs.controller.ListController = (function ($scope, $http, myBoard, mySockets) {

    var cardTempCount = 1;

    $scope.board = myBoard;

    $scope.isCreateListCollapsed = false;
    $scope.isCreateListModalCollapsed = false;
    $scope.isDebugCollapsed = true;


    //    $scope.cloneForDrag = function (e) {
    //        var card = e.currentTarget;
    //        console.log(card);
    //        var cloneCard = $.clone(card);
    //        $(cloneCard).addClass('dragClone');
    //        return cloneCard;
    //    };


    var populateBoard = function () {
        var testBoardId = 1;
        $http.get("api/ScrumBoardRestApi/GetAllBoardDataById?id=" + testBoardId).success(function (data) {
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

        }); ;
    };

    var _addListEvent = function (list) {
        myBoard.addList(list);
    };


    $scope.addListWithName = function (title, id) {
        var list = SkilzJs.model.list.FactoryCreate(title, id);
        myBoard.addList(list);
    };

    $scope.addCardWithName = function (listId, title, id) {
        var list = myBoard.getListById(listId);
        var card = SkilzJs.model.card.FactoryCreate(title, id);
        list.addCard(card);
    };

    $scope.moveCard = function (sourceCardId, targetListId, targetCardId) {
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


    $scope.addListEvent = _addListEvent;

    $scope.dropListener = function (eDraggable, eDroppable) {

        var isDropForbidden = function (aTarget, item) {
            //            if (aTarget.some(function (i) {
            //                return i.name == item.name;
            //            })) {
            //                return { reason: 'target already contains "' + item.name + '"' };
            //            } else {
            //                return false;
            //            }
            return false;
        };

        var onDropRejected = function (error) {
            alert('Operation not permitted: ' + error.reason);
        };

        var onDropComplete = function (eSrc, item, index) {
            //            alert('moved "' + item.name + ' from ' + eSrc.data('model') + '[' + index + ']' + ' to ' + eDroppable.data('model'));
            //            console.log('moved "' + item.name + ' from ' + eSrc.data('model') + '[' + index + ']' + ' to ' + eDroppable.data('model'));
        };


        var sourceCardId = eDraggable.data('cardid');
        var targetCardId = eDroppable.data('cardid');

        //       alert(sourceCardId);
        //       alert(targetCardId);

        $scope.$apply(function () {

            var sourceCard = myBoard.getCardById(sourceCardId);

            var targetListId = -1;
            if (targetCardId != -1) {
                var targetCard = myBoard.getCardById(targetCardId);
                targetListId = targetCard.listId;
            } else {
                targetListId = eDroppable.data('listid');
            }

            //            var sourceListId = sourceCard.listId;
            //            var sourceList = myBoard.getListById(sourceListId);
            //            sourceList.removeCard(sourceCard);
            //            $('dragClone').remove();

            $http.put("api/ScrumBoardRestApi/MoveCard?sourceCardId=" + sourceCardId + "&targetListId=" + targetListId + "&targetCardId=" + targetCardId);
        });


        //var sSrc = eSrc.data('model');
        //        var sTarget = eDroppable.data('model');

        //        var targetListIndex = eDroppable.data('listindex');

        /*

        var targetList = myBoard.ScrumLists[targetListIndex];

        if (sSrc != sTarget) {
        $scope.$apply(function () {
        var 


        //var index = eDraggable.data('index');
        var sourceCardIndex = eDraggable.data('cardindex');
        var sourceCard = 

        //                var aSrc = $scope.$eval(sSrc);
        var aSrc = sSrc;
        //                var aTarget = $scope.$eval(sTarget);
        var aTarget = sTarget;
        //                var item = aSrc[index];
        var item = aSrc.cards[index];

        var error = isDropForbidden(aTarget, item);
        if (error) {
        onDropRejected(error);
        } else {
        //aTarget.push(item);
        aTarget.cards.push(item);
        //                    aSrc.splice(index, 1);
        aSrc.cards.splice(index, 1);
        onDropComplete(eSrc, item, index);
        }
                

        });
        }
        */

    };

    populateBoard();

    mySockets.setupSocket($scope);

});

SkilzJs.controller.ListController.$inject = ["$scope", "$http", "myBoard", "mySockets"];


$(document).ready(function () {

    $('#scrollButt').click(function () {


        $('.listItemScroll').first().mousemove(function (e) {
            var $this = $(this);
            var $inner = $('.listItem', $this);
            console.log($inner.height());
            var h = $inner.height() + 13;
            var offset = $this.offset();
            var position = (e.pageY - offset.top) / $this.height();
            //console.log(position);
            if (position < 0.15) {
                $this.stop().animate({ scrollTop: 0 }, 1000);
            }
            else if (position < 0.33) {
                $this.stop().animate({ scrollTop: 0 }, 15000);
            }
            else if (position > 0.75) {
                $this.stop().animate({ scrollTop: h }, 1000);
            } 
            else if (position > 0.66) {
                $this.stop().animate({ scrollTop: h }, 15000);
            } else {
                $this.stop();
            }
        });
    });

});


