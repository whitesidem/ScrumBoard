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
    },
    getCardById: function (id) {
        var total = this.lists.length;
        for(var i = 0; i < total; i++ )
        {
            var card = this.lists[i].getCardById(id);
            if (_(card).isObject()) {
                return card;
            }
        }
        return null;
    }
    
};

SkilzJs.model.list = {
    FactoryCreate: function (title, id) {
        var list = Object.create(SkilzJs.model.list);
        list.id = id;
        list.title = title;
        list.cards = [];
        return list;
    },
    addCard: function (card, index) {
        card.listId = this.id;
        if (_(index).isUndefined()) {
            this.cards.push(card);
            return;
        }
        this.cards.splice(index, 0, card);
    },
    removeCard: function (card) {
        var sourceIndex = _(this.cards).indexOf(card);
        if (sourceIndex >= 0) {
            this.cards.splice(sourceIndex, 1);
        }
    },
    getCardByTitle: function (title) {
        return  _(this.cards).find(function(c) { return c.title === title; });
    },
    getCardById: function (id) {
        return  _(this.cards).find(function(c) { return c.id === id; });
    },
};

SkilzJs.model.card = {
    FactoryCreate: function (title, id, isDraft) {
        var card = Object.create(SkilzJs.model.card);
        card.id = id;
        card.title = title;
        card.draft = isDraft || false;
        card.listId = -1;
        return card;
    }
};
