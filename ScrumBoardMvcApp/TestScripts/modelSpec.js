/// <reference path="jasmine-1.3.1/jasmine.js" />
/// <reference path="Shared/global.js" />
/// <reference path="../Scripts/models.js" />

describe("model objects", function () {

    beforeEach(function () {
        this.board = SkilzJs.model.board.FactoryCreate("testBoard");
    });

    it("can create list", function() {
        var list = SkilzJs.model.list.FactoryCreate("testList");
        expect(list.title).toBe("testList");
    });

    it("can create instances of lists with distinct values", function () {
        var list1 = SkilzJs.model.list.FactoryCreate("testList1");
        var list2 = SkilzJs.model.list.FactoryCreate("testList2");
        expect(list1.title).toBe("testList1");
        expect(list2.title).toBe("testList2");
    });


    it("can create card", function () {
        var card = SkilzJs.model.card.FactoryCreate("testCard");
        expect(card.title).toBe("testCard");
        expect(card.draft).toBe(false);
    });

    it("can create card in draft state", function () {
        var card = SkilzJs.model.card.FactoryCreate("testCard", true);
        expect(card.title).toBe("testCard");
        expect(card.draft).toBe(true);
    });


    it("can create instances of cards with distinct values", function () {
        var card1 = SkilzJs.model.card.FactoryCreate("testCard1");
        var card2 = SkilzJs.model.card.FactoryCreate("testCard2");
        expect(card1.title).toBe("testCard1");
        expect(card2.title).toBe("testCard2");
    });


    describe("when construct board", function () {

        it("board exists", function () {
            expect(this.board).not.toBeNull();
        });

        it("board has name", function () {
            expect(this.board.name).toBe("testBoard");
        });

    });

    describe("when add lists", function () {

        beforeEach(function () {
            var list1 = SkilzJs.model.list.FactoryCreate("list1");
            var list2 = SkilzJs.model.list.FactoryCreate("list2");
            this.board.addList(list1);
            this.board.addList(list2);
        });

        it("lists exist", function () {
            expect(this.board.lists.length).toBe(2);
        });

        it("lists have correct titles", function () {
            expect(this.board.lists[0].title).toBe("list1");
            expect(this.board.lists[1].title).toBe("list2");
        });

        it("lists can be retrieved by title", function () {
            expect(this.board.getListByTitle("list1").title).toBe("list1");
            expect(this.board.getListByTitle("list2").title).toBe("list2");
        });

        describe("then add cards", function () {

            beforeEach(function () {
                var card1 = SkilzJs.model.card.FactoryCreate("card1");
                var card2 = SkilzJs.model.card.FactoryCreate("card2");
                var card3 = SkilzJs.model.card.FactoryCreate("card3");
                var list1 = this.board.getListByTitle("list1");
                list1.addCard(card1);
                list1.addCard(card2);
                list1.addCard(card3);

                var cardA = SkilzJs.model.card.FactoryCreate("cardA");
                var cardB = SkilzJs.model.card.FactoryCreate("cardB");
                var list2 = this.board.getListByTitle("list2");
                list2.addCard(cardA);
                list2.addCard(cardB);

            });

            it("3 cards exists exist for list 1", function () {
                var list = this.board.getListByTitle("list1");
                expect(list.cards.length).toBe(3);
            });

            it("2 cards exists exist for list 2", function () {
                var list = this.board.getListByTitle("list2");
                expect(list.cards.length).toBe(2);
            });

            it("cards have correct titles", function () {
                var list = this.board.getListByTitle("list1");
                expect(list.cards[0].title).toBe("card1");
                expect(list.cards[1].title).toBe("card2");
                expect(list.cards[2].title).toBe("card3");
            });

            it("cards can be retrieved by title", function () {
                var list1 = this.board.getListByTitle("list1");
                expect(list1.getCardByTitle("card1").title).toBe("card1");
                var list2 = this.board.getListByTitle("list2");
                expect(list2.getCardByTitle("cardB").title).toBe("cardB");
            });

        });

    });


})