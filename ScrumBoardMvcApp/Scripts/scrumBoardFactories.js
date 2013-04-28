/// <reference path="External/Angular/angular.js" />
/// <reference path="Shared/global.js" />
/// <reference path="models.js" />

angular.module("ScrumBoardApp")
.factory("myBoard", function () {
    var board = SkilzJs.model.board.FactoryCreate("TestBoard");
    board.id = 1;
    return board;
})
.factory("mySockets", function () {
    return SkilzJs.sockets.socketController;
});

