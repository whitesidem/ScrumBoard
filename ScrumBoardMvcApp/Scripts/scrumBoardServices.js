/// <reference path="/Scripts/External/jquery-ui-1.10.2.js" />
/// <reference path="/Scripts/External/jquery-ui-1.10.2.js" />
/// <reference path="/Scripts/External/Angular/angular.js" />
/// <reference path="/Scripts/Shared/global.js" />
/// <reference path="/Scripts/models.js" />

SkilzJs.namespace('sockets.BoardEventsService');

SkilzJs.sockets.BoardEventsService = {
    _rootScope: null,
    _currentBoard: null,

    init: function (scope, currentBoard) {
        SkilzJs.sockets.BoardEventsService._rootScope = scope;
        SkilzJs.sockets.BoardEventsService._currentBoard = currentBoard;
    },

    uiUpdateCardLocationEvent: function (sourceCardId, targetListId, targetCardId) {
        var sourceCard = SkilzJs.sockets.BoardEventsService._currentBoard.getCardById(sourceCardId);

        var sourceListId = sourceCard.listId;
        var sourceList = SkilzJs.sockets.BoardEventsService._currentBoard.getListById(sourceListId);
        SkilzJs.sockets.BoardEventsService._rootScope.$apply(function () {
            sourceList.removeCard(sourceCard);
            var targetList = null;
            if (targetCardId != -1) {
                var targetCard = SkilzJs.sockets.BoardEventsService._currentBoard.getCardById(targetCardId);
                targetListId = targetCard.listId;
                targetList = SkilzJs.sockets.BoardEventsService._currentBoard.getListById(targetListId);
                var targetIndex = _(targetList.cards).indexOf(targetCard);
                targetList.addCard(sourceCard, targetIndex);
            } else {
                targetList = SkilzJs.sockets.BoardEventsService._currentBoard.getListById(targetListId);
                targetList.addCard(sourceCard);
            }
        });
    },
    
    addListWithNameEvent : function (title, id) {
        var list = SkilzJs.model.list.FactoryCreate(title, id);
        SkilzJs.sockets.BoardEventsService._rootScope.$apply(function () {
            SkilzJs.sockets.BoardEventsService._currentBoard.addList(list);
        });
    },

    addCardWithNameEvent : function (listId, title, id) {
        var list = SkilzJs.sockets.BoardEventsService._currentBoard.getListById(listId);
        var card = SkilzJs.model.card.FactoryCreate(title, id);
        SkilzJs.sockets.BoardEventsService._rootScope.$apply(function () {
            list.addCard(card);
        });
    }
};
