/// <reference path="External/Angular/angular.js" />
/// <reference path="Shared/global.js" />
/// <reference path="models.js" />
/// <reference path="scrumBoardServices.js" />

var app = angular.module("ScrumBoardApp");

//Note: services return singleton instances, wheras factories execute and return result of function

app.factory("CurrentBoard", function() {

    if (_(SkilzJs.model.board).isDefined) { //Singleton, return already constructed board
        return SkilzJs.model.board.TestBoard;
    }
    var board = SkilzJs.model.board.FactoryCreate("TestBoard");
    board.id = 1;
    return board;
});

app.factory('BoardRestService', ['$resource', function ($resource) {
    return $resource('api/ScrumBoardRestApi/GetAllBoardDataById?id=:id', { id: '@id' });
} ]);

app.factory('BoardLoader', ['BoardRestService', '$route', '$q', function (boardRestService, $route, $q) {
    return function () {
        var delay = $q.defer();
        boardRestService.get({ id: $route.current.params.boardId },
            function (data) {
                //                console.log('success data');
                //                console.log(data);
                delay.resolve(data);            //success data returned by promise return statement below
            },
            function () { console.log('failed BoardLoader'); }
        );
        //        console.log("get promise");
        return delay.promise;           //Continue only when promise is fullfilled 
    };
} ]);


app.service('BoardEventsService', ['CurrentBoard', '$rootScope', function (currentBoard, rootScope) {
    SkilzJs.sockets.BoardEventsService.init(rootScope, currentBoard);
    return SkilzJs.sockets.BoardEventsService;
} ]);


app.factory("BoardSockets", ['BoardEventsService', function (boardEventsService) {
    SkilzJs.sockets.socketController.init(boardEventsService);
    return SkilzJs.sockets.socketController;
} ]);


