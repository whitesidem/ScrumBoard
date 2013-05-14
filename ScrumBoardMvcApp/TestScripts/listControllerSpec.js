/// <reference path="jasmine-1.3.1/jasmine.js" />
/// <reference path="../Scripts/External/Angular/angular.js" />
/// <reference path="../Scripts/External/Angular/angular-mocks.js" />
/// <reference path="../Scripts/Shared/global.js" />
/// <reference path="../Scripts/listController.js" />

// ReSharper disable InconsistentNaming
describe("list controller", function () {

    var _listController;
    var _scope;
    var _testBoard;
    var _$httpBackend;
    //    var socketStub = {
    //        setupSocket: function () { }
    //    };
    var socketStubSpy;

    //reference the module so all inner tests can get at controller
    beforeEach(
        function () {
            var a = angular.module('ScrumBoardApp');
            var b = 1;
        }
    );

    describe("list controller", function () {

        beforeEach(inject(function ($rootScope, $controller) {

            _scope = $rootScope.$new();
            _testBoard = SkilzJs.model.board.FactoryCreate("TestBoard");
            socketStubSpy = jasmine.createSpyObj('socketStub', ['setupSocket']);

            //_listController = $controller("ListController", { $scope: _scope, $http: _$httpBackend, myBoard: _testBoard, mySockets: socketStubSpy });
            _listController = $controller("ListController", { $scope: _scope, myBoard: _testBoard, mySockets: socketStubSpy });
        }));

        it("can be constructed", function () {
            expect(_listController).not.toBeNull();
            expect(socketStubSpy.setupSocket).toHaveBeenCalledWith(_scope);
        });

        it("can access board via scope", function () {
            expect(_scope.board).toBe(_testBoard);
        });

        it("board is populated", function () {
            expect(_scope.board.lists.length).toBe(0);
        });

        describe("when invokes add new list event", function () {

            it("new list is added", function () {
                var list = SkilzJs.model.list.FactoryCreate("NewList1");
                _scope.addListEvent(list);
                expect(_testBoard.getListByTitle("NewList1").title).toBe("NewList1");
            });

        });

    });

})

