/// <reference path="Shared/global.js" />
/// <reference path="External/underscore.js" />

SkilzJs.namespace('model');

SkilzJs.model.board = {
    FactoryCreate: function (name) {
        var board = Object.create(SkilzJs.model.board);
        board.name = name;
        board.lists = [];
        return board;
    },
    addList: function (list) {
        this.lists.push(list);
    },
    getListByTitle: function (title) {
        return  _(this.lists).find(function(l) { return l.title === title; });
    },
    getListById: function (id) {
        return  _(this.lists).find(function(l) { return l.id === id; });
    }
};

SkilzJs.model.list = {
    FactoryCreate: function (title) {
        var list = Object.create(SkilzJs.model.list);
        list.id = -1;
        list.title = title;
        list.cards = [];
        return list;
    },
    addCard: function (card) {
        this.cards.push(card);
    },
    getCardByTitle: function (title) {
        return  _(this.cards).find(function(c) { return c.title === title; });
    },
};

SkilzJs.model.card = {
    FactoryCreate: function (title, isDraft) {
        var card = Object.create(SkilzJs.model.card);
        card.id = -1;
        card.title = title;
        card.draft = isDraft || false;
        return card;
    }
};
