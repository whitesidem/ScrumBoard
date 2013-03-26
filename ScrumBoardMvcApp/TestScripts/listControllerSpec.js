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
//    var socketStub = {
//        setupSocket: function () { }
//    };
    var socketStubSpy;

    beforeEach(inject(function ($rootScope, $controller) {
        _scope = $rootScope.$new();
        _testBoard = SkilzJs.model.board.FactoryCreate("TestBoard");
        socketStubSpy = jasmine.createSpyObj('socketStub', ['setupSocket']);

        _listController = $controller(SkilzJs.controller.ListController, { $scope: _scope, myBoard: _testBoard, mySockets: socketStubSpy });
    }));

    it("can be constructed", function () {
        expect(_listController).not.toBeNull();
        expect(socketStubSpy.setupSocket).toHaveBeenCalledWith(_scope);
    });

    it("can access board via scope", function () {
        expect(_scope.board).toBe(_testBoard);
    });

    it("board is populated", function () {
        expect(_scope.board.lists.length).toBe(2);
    });

    describe("when invokes add new list event", function () {

        it("new list is added", function () {
            var list = SkilzJs.model.list.FactoryCreate("NewList1");
            _scope.addListEvent(list);
            expect(_testBoard.getListByTitle("NewList1").title).toBe("NewList1");
        });

    });


})