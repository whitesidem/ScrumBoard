/// <reference path="/Scripts/External/SignalR/jquery.signalR-1.0.1.js" />

SkilzJs.namespace('sockets.socketController');

SkilzJs.sockets.socketController.setupSocket = function ($scope) {
    // Declare a proxy to reference the hub. 
    var scrumBoard = $.connection.scrumBoardHub;

    // Create a function that the hub can call to broadcast messages.
    scrumBoard.client.broadcastAddedListMessage = function (title, id) {
        $scope.$apply(function () {
            $scope.addDraftListWithName(title, id);
        });
    };

    //Start connection to socket
    $.connection.hub.start().done(function () {
        //                scrumBoard.server.test();
    });

};
