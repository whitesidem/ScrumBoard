/// <reference path="/Scripts/External/SignalR/jquery.signalR-1.0.1.js" />

SkilzJs.namespace('sockets.socketController');

SkilzJs.sockets.socketController.setupSocket = function ($scope) {

    console.log('set up sockets');


    // Declare a proxy to reference the hub. 
    var scrumBoard = $.connection.scrumBoardHub;

    // Create a function that the hub can call to broadcast messages.
    scrumBoard.client.broadcastAddedListMessage = function (title, id) {
        console.log('addListMsg');
        $scope.$apply(function () {
            $scope.addListWithNameEvent(title, id);
        });
    };

    scrumBoard.client.broadcastAddedCardMessage = function (listId, title, id) {
        console.log('addCardMsg');
        $scope.$apply(function () {
            $scope.addCardWithNameEvent(listId, title, id);
        });
    };

    scrumBoard.client.moveCard = function (sourceCardId, targetListId, targetCardId) {
        console.log('moveCardMsg');
        $scope.$apply(function () {
            $scope.uiUpdateCardLocationEvent(sourceCardId, targetListId, targetCardId);
        });
    };


    //Start connection to socket
    $.connection.hub.start().done(function () {
        //                scrumBoard.server.test();
    });

};
