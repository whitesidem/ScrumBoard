/// <reference path="External/Angular/angular.js" />
/// <reference path="Shared/global.js" />
/// <reference path="models.js" />
/// <reference path="External/mCustomScrollbar/jquery.mCustomScrollbar.js" />

(function () {
    var app = angular.module("ScrumBoardApp", ['ui.bootstrap', 'ngResource']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/Board/:boardId', {
                controller: 'ListController',
                templateUrl: 'Templates/ScrumBoard/ScrumBoardList.htm',
                resolve: {
                    boardData: function (BoardLoader) {
                        return BoardLoader();
                    }
                }
            })
            .otherwise({ redirectTo: '/Board/1' });
    } ]);





    /*
    app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/', {
    controller: 'ListController'
    }),
    when('/list', {
    controller: 'ListController'
    //                ,
    //               resolve: {
    //                   
    //               }
    })
    .otherwise({redirectTo:'/'});
    } ]);
    */

} ());




//angular.module("ScrumBoardApp", ['ui.bootstrap', 'ListController']);




//angular.module("ScrumBoardApp").run(
//    function () {
//        console.log("ScrumBoardApp run");
//    } ()
//);
