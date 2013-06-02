/// <reference path="jasmine-1.3.1/jasmine.js" />
/// <reference path="Shared/global.js" />
/// <reference path="../Scripts/models.js" />
/// <reference path="../Scripts/External/Angular/angular.js" />
/// <reference path="../Scripts/External/Angular/angular-mocks.js" />
/// <reference path="../Scripts/External/Angular/angular-resource.js" />

describe("board event service", function () {

    var _scope;
    var _testBoard;


    //reference the module so all inner tests can get at controller
    beforeEach(
        function () {
            angular.mock.module('ScrumBoardApp');
        }
    );

    // Setup the mock service in an anonymous module.
    //        beforeEach(angular.module(function ($provide) {
    //Ref:http://stackoverflow.com/questions/16565531/angularjs-unit-testing-a-factory-that-has-dependencies
    //        $provide.value('oneOfMyOtherServicesStub', {
    //            someVariable: 1
    //       });
    //    }));


    //    beforeEach(angular.module(function ($provide) {
    //    }));

    beforeEach(angular.mock.inject(function ($rootScope) {
        _scope = $rootScope.$new();
        _testBoard = SkilzJs.model.board.FactoryCreate("NewTestBoard");
        SkilzJs.sockets.BoardEventsService.init(_scope, _testBoard);
        var temp = 1;
    }));


    //    it('can get an instance of service', inject(function (BoardEventsService) {
    //        expect(BoardEventsService).toBeDefined();
    //    }));

    it('can get an instance of service', function () {
        expect(SkilzJs.sockets.BoardEventsService._rootScope).toBe(_scope);
        expect(SkilzJs.sockets.BoardEventsService._currentBoard).toBe(_testBoard);
        expect(_testBoard.lists.length).toBe(0);
    });


    describe("when call addListWithNameEvent", function () {

        beforeEach(function () {
            this._listNameStub = 'TestNewList1';
            this._idStub = 200;
            SkilzJs.sockets.BoardEventsService.addListWithNameEvent(this._listNameStub, this._idStub);
        });

        it('adds new list with passed params', function () {
            expect(_testBoard.lists[0].title).toBe(this._listNameStub);
            expect(_testBoard.lists[0].id).toBe(this._idStub);
        });

        describe("when call addCardWithNameEvent", function() {
            beforeEach(function() {
                this._cardNameStub = 'TestNewCard1';
                this._cardIdStub = 300;
                SkilzJs.sockets.BoardEventsService.addCardWithNameEvent(this._idStub, this._cardNameStub, this._cardIdStub);
            });

            it('adds new card with passed params to the specified list', function() {
                expect(_testBoard.lists[0].cards[0].title).toBe(this._cardNameStub);
                expect(_testBoard.lists[0].cards[0].id).toBe(this._cardIdStub);
            });
        });
    });



})