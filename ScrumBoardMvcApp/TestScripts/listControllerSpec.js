﻿/// <reference path="jasmine-1.3.1/jasmine.js" />
/// <reference path="../Scripts/External/Angular/angular.js" />
/// <reference path="../Scripts/External/Angular/angular-mocks.js" />
/// <reference path="../Scripts/External/Angular/angular-resource.js" />
/// <reference path="../Scripts/Shared/global.js" />
/// <reference path="../Scripts/listController.js" />

// ReSharper disable InconsistentNaming
describe("list controller environment", function () {

    var _listController;
    var _scope;
    var _testBoard;
//    var _$httpBackend;
    var _boardDataStub;
    var _socketStub = {};

    //reference the module so all inner tests can get at controller
    beforeEach(
        function () {
            angular.mock.module('ScrumBoardApp');
        }
    );

    describe("list controller", function () {

        beforeEach(angular.mock.inject(function ($rootScope, $controller) {
            _scope = $rootScope.$new();
            _testBoard = SkilzJs.model.board.FactoryCreate("TestBoard");
//            _socketStub.init = function () { };
//            spyOn(_socketStub, 'init');

            _boardDataStub = {};

            _listController = $controller("ListController", { $scope: _scope, CurrentBoard: _testBoard, BoardSockets: _socketStub, boardData: _boardDataStub });
            
        }));

        it("can be constructed", function () {
            expect(_listController).not.toBeNull();
 //           expect(_socketStubSpy.init).toHaveBeenCalledWith(_scope);
        });

        it("can access board via scope", function () {
            expect(_scope.board).toBe(_testBoard);
        });

        it("board is populated", function () {
            expect(_scope.board.lists.length).toBe(0);
        });

    });

})

