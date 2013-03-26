/// <reference path="External/Angular/angular.js" />
/// <reference path="Shared/global.js" />
/// <reference path="models.js" />

angular.module("ScrumBoardApp")
.factory("myBoard", function () {
    return SkilzJs.model.board.FactoryCreate("TestBoard");
})
.factory("mySockets", function () {
    return SkilzJs.sockets.socketController;
});

