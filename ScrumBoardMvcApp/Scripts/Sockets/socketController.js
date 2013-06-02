/// <reference path="/Scripts/External/SignalR/jquery.signalR-1.0.1.js" />

SkilzJs.namespace('sockets.socketController');

SkilzJs.sockets.socketController.init = function (boardEventsService) {

    console.log('set up sockets');

    // Declare a proxy to reference the hub. 
    var scrumBoard = $.connection.scrumBoardHub;

    // Create a function that the hub can call to broadcast messages.
    scrumBoard.client.broadcastAddedListMessage = function (title, id) {
        console.log('addListMsg');
        boardEventsService.addListWithNameEvent(title, id);
    };

    scrumBoard.client.broadcastAddedCardMessage = function (listId, title, id) {
        console.log('addCardMsg');
        boardEventsService.addCardWithNameEvent(listId, title, id);
    };

    scrumBoard.client.moveCard = function (sourceCardId, targetListId, targetCardId) {
        console.log('moveCardMsg');
        boardEventsService.uiUpdateCardLocationEvent(sourceCardId, targetListId, targetCardId);
    };


    //Start connection to socket
    $.connection.hub.start().done(function () {
        console.log('socket started');
        //                scrumBoard.server.test();
    });

};

