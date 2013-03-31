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
                // $scope.$apply();
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

        var eSrc = eDraggable.closest('.listDroppable');
        var sSrc = eSrc.data('model');
        var sTarget = eDroppable.data('model');

        if (sSrc != sTarget) {
            $scope.$apply(function () {
                var index = eDraggable.data('index');
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

    };

    populateBoard();

    mySockets.setupSocket($scope);

});

SkilzJs.controller.ListController.$inject = ["$scope", "$http", "myBoard", "mySockets"];


