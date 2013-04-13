/// <reference path="/Scripts/External/SignalR/jquery.signalR-1.0.1.js" />

SkilzJs.namespace('sockets.socketController');

SkilzJs.sockets.socketController.setupSocket = function ($scope) {
    // Declare a proxy to reference the hub. 
    var scrumBoard = $.connection.scrumBoardHub;

    // Create a function that the hub can call to broadcast messages.
    scrumBoard.client.broadcastAddedListMessage = function (title, id) {
        $scope.$apply(function () {
            $scope.addListWithName(title, id);
        });
    };

    scrumBoard.client.broadcastAddedCardMessage = function (listId, title, id) {
        $scope.$apply(function () {
            $scope.addCardWithName(listId, title, id);
        });
    };

    scrumBoard.client.moveCard = function (sourceCardId, targetListId, targetCardId) {
        $scope.$apply(function () {
            $scope.moveCard(sourceCardId, targetListId, targetCardId);
        });
    };
    

    //Start connection to socket
    $.connection.hub.start().done(function () {
        //                scrumBoard.server.test();
    });

};
