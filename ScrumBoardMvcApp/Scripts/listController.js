﻿/// <reference path="External/Angular/angular.js" />
/// <reference path="Shared/global.js" />
/// <reference path="models.js" />

// ReSharper disable InconsistentNaming

SkilzJs.namespace('controller');

SkilzJs.controller.ListController = (function ($scope, myBoard, mySockets) {

    var cardTempCount = 1;

    $scope.board = myBoard;

    $scope.isCreateListCollapsed = false;
    $scope.isCreateListModalCollapsed = false;
    $scope.isDebugCollapsed = true;


    var populateBoard = function () {
        var list = SkilzJs.model.list.FactoryCreate("MyList1");
        list.addCard(SkilzJs.model.card.FactoryCreate("Webtrends"));
        list.addCard(SkilzJs.model.card.FactoryCreate("Rebrand"));
        list.addCard(SkilzJs.model.card.FactoryCreate("BAU"));
        myBoard.addList(list);
        list = SkilzJs.model.list.FactoryCreate("MyList2");
        list.addCard(SkilzJs.model.card.FactoryCreate("Maxymiser"));
        list.addCard(SkilzJs.model.card.FactoryCreate("ClickTale"));
        myBoard.addList(list);
    };

    var _addListEvent = function (list) {
        myBoard.addList(list);
    };

    //    var createDraftList = function () {
    //        $scope.draftList = SkilzJs.model.list.FactoryCreate("");
    //    };

    //    var createDraftCard = function () {
    //        $scope.draftCard = SkilzJs.model.card.FactoryCreate("", true);
    //    };

    $scope.addDraftListWithName = function (title, id) {
        var list = SkilzJs.model.list.FactoryCreate(title);
        list.id = id;
        myBoard.addList(list);
    };

    $scope.addDraftCard = function (list) {
        var card = SkilzJs.model.card.FactoryCreate("Card" + cardTempCount++, true);
        list.addCard(card);
    };

    $scope.setCurrentCard = function(card) {
        $scope.currentCard = card;
    };

    //ON OK SAVE OF DRAFT CARD - Remove card and
    //Listen for addCardEvent
    var addCardEvent = function (card, listId) {
        myBoard.addList(list);
    };


    $scope.addListEvent = _addListEvent;

    populateBoard();

    //    createDraftList();
    //    createDraftCard();

    mySockets.setupSocket($scope);

});

SkilzJs.controller.ListController.$inject = ["$scope", "myBoard", "mySockets"];


