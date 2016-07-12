'use strict';

module.exports = {
    create: create,
    retrieve: retrieve,
    clear: clear,
    addItem: addItem
};

let checkoutMap = {};

let itemPrices = {
    "Aceite" : 5.23
};

function create(id) {
    checkoutMap[id] = {
        total: {
            value: 0,
            currency: 'EUR'
        }
    };

    return checkoutMap[id];
}

function retrieve(id) {
    return checkoutMap[id];
}

function clear() {
    checkoutMap = {};
}

function addItem(id, itemName){
    checkoutMap[id].total.value += itemPrices[itemName];
    return checkoutMap[id];
}
