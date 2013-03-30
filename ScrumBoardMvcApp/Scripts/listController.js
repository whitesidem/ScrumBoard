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
        $http.get("api/ScrumBoardRestApi/GetBoardById?id=" + "1").success(function (data) {
            if (_(data).isUndefined()) return;
            if (_(data.ScrumLists).isUndefined()) return;
            _(data.ScrumLists).each(function (e) {
                var list = SkilzJs.model.list.FactoryCreate(e.Title, e.id);
                _(e.ScrumCards).each(function (e) {
                    var card = SkilzJs.model.card.FactoryCreate(e.Title, e.id);
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

    populateBoard();

    mySockets.setupSocket($scope);

});

SkilzJs.controller.ListController.$inject = ["$scope", "$http", "myBoard", "mySockets"];


