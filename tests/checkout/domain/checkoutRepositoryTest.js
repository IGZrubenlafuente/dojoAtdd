'use strict';

const checkoutRepository = require('../../../src/checkout/domain/checkoutsRepository');

require('chai').should();
const expect = require('chai').expect;

describe('The Checkout Repository', () => {

    beforeEach(function () {
        checkoutRepository.clear();
    });

    const fixture = {
        id: 1,
        nonexistingId: 2,
        itemName: "Aceite",
        checkout: {
            total: {
                value: 0,
                currency: 'EUR'
            }
        },
        checkoutWith1Item: {
            total: {
                value: 5.23,
                currency: 'EUR'
            }
        }
    };

    it('Should create a new checkout given an identifier', done => {
        const id = fixture.id;
        const checkout = checkoutRepository.create(id);

        checkout.should.deep.equal(fixture.checkout);

        done();
    });

    it('Should retrieve a previously checkout given an identifier', done => {
        const id = fixture.id;

        checkoutRepository.create(id);
        const checkout = checkoutRepository.retrieve(id);

        checkout.should.deep.equal(fixture.checkout);

        done();
    });

    it('Should retrieve an undefined checkout when it have not been created previously', done => {
        const id = fixture.id;
        const checkout = checkoutRepository.retrieve(id);

        expect(checkout).to.be.an('undefined');

        done();
    });

    it('Should retrieve an undefined checkout when adding an item to a non-existing checkout', done => {
        const id = fixture.nonexistingId;
        const itemName = fixture.itemName;
        const checkout = checkoutRepository.addItem(id, itemName);

        expect(checkout).to.be.an('undefined');

        done();
    });

    it('Should add an item to an empty checkout and retrieve the checkout with the new total', done => {
        const id = fixture.id;
        const checkout = checkoutRepository.create(id)
        const itemName = fixture.itemName;
        const checkoutWith1Item = checkoutRepository.addItem(id, itemName);

        checkoutWith1Item.should.deep.equal(fixture.checkoutWith1Item);

        done();
    });

});
