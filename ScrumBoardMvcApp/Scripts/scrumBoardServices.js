/// <reference path="/Scripts/External/jquery-ui-1.10.2.js" />
/// <reference path="/Scripts/External/jquery-ui-1.10.2.js" />
/// <reference path="/Scripts/External/Angular/angular.js" />
/// <reference path="/Scripts/Shared/global.js" />
/// <reference path="/Scripts/models.js" />

var services = angular.module("ScrumBoardApp");

services.factory('BoardRestService', ['$resource', function ($resource) {
    return $resource('api/ScrumBoardRestApi/GetAllBoardDataById?id=:id', { id: '@id' });
} ]);

services.factory('BoardLoader', ['BoardRestService', '$route', '$q', function (BoardRestService, $route, $q) {
    return function () {
        var delay = $q.defer();
        BoardRestService.get({ id: $route.current.params.boardId },
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
