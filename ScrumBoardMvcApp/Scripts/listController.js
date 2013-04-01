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


    var populateBoard = function () {
        var testBoardId = 1;
        $http.get("api/ScrumBoardRestApi/GetBoardById?id=" + testBoardId).success(function (data) {
            if (_(data).isUndefined()) return;
            if (_(data.ScrumLists).isUndefined()) return;
            _(data.ScrumLists).each(function (e) {
                var list = SkilzJs.model.list.FactoryCreate(e.Title, e.Id);
                _(e.ScrumCards).each(function (e) {
                    var card = SkilzJs.model.card.FactoryCreate(e.Title, e.Id);
                    list.addCard(card);
                });
                myBoard.addList(list);
            });

        }); ;


        //                var list = SkilzJs.model.list.FactoryCreate("MyList1");
        //                list.addCard(SkilzJs.model.card.FactoryCreate("Webtrends"));
        //                list.addCard(SkilzJs.model.card.FactoryCreate("Rebrand"));
        //                list.addCard(SkilzJs.model.card.FactoryCreate("BAU"));
        //                myBoard.addList(list);
        //                list = SkilzJs.model.list.FactoryCreate("MyList2");
        //                list.addCard(SkilzJs.model.card.FactoryCreate("Maxymiser"));
        //                list.addCard(SkilzJs.model.card.FactoryCreate("ClickTale"));
        //                myBoard.addList(list);

    };

    var _addListEvent = function (list) {
        myBoard.addList(list);
    };


    $scope.addDraftListWithName = function (title, id) {
        var list = SkilzJs.model.list.FactoryCreate(title, id);
        myBoard.addList(list);
    };

    $scope.addDraftCardWithName = function (listId, title, id) {
        var list = myBoard.getListById(listId);
        var card = SkilzJs.model.card.FactoryCreate(title, id, true);
        list.addCard(card);
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

            var sourceListId = sourceCard.listId;
            var sourceList = myBoard.getListById(sourceListId);
            sourceList.removeCard(sourceCard);

            $http.put("api/ScrumBoardRestApi/MoveCard?sourceCardId=" + sourceCardId + "&targetListId=" + targetListId + "&targetCardId=" + targetCardId);


/*
            var targetListId = -1;
            var targetList = null;
            if (targetCardId != -1) {
                var targetCard = myBoard.getCardById(targetCardId);
                targetListId = targetCard.listId;
                targetList = myBoard.getListById(targetListId);
                var targetIndex = _(targetList.cards).indexOf(targetCard);
                targetList.addCard(sourceCard, targetIndex);
            } else {
                targetListId = eDroppable.data('listid');
                targetList = myBoard.getListById(targetListId);
                targetList.addCard(sourceCard);
            }
*/

            //            alert(sourceList.title);
            //            alert(targetList.title);

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


