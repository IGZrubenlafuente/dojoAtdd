'use strict';

const sinon = require('sinon'),
    proxyquire = require('proxyquire');

require('chai').should();

let repositoryStub = {},
    addItemToCheckout = proxyquire('../../../src/checkout/rest/addItemToCheckout', {
        '../domain/checkoutsRepository': repositoryStub
    });

describe('Add item to checkout', () => {

    it('Should return 200 status code when add an item to an existing checkout', done => {
        const request = createRequest(),
            response = createResponse();

        const responseMock = sinon.mock(response);
        repositoryStub.addItem = function() {
            return {};
        };

        responseMock.expects('send').once().withArgs(200, sinon.match.any);
        addItemToCheckout(request, response, () => {
            responseMock.verify();
            done();
        });
    });

    it('Should return 404 status code when there is no checkout created', done => {
        const request = createRequest(),
            response = createResponse();

        const responseMock = sinon.mock(response);
        repositoryStub.addItem = function() {
            return undefined;
        };

        responseMock.expects('send').once().withArgs(404);
        addItemToCheckout(request, response, () => {
            responseMock.verify();
            done();
        });
    });

	it('Should call the next function', done => {
        const request = createRequest(),
            response = createResponse();

        const nextMock = sinon.mock();
        nextMock.once();

        addItemToCheckout(request, response, nextMock);
        nextMock.verify();
        done();
    });

    function createRequest() {
        return {
            params: {
            	checkoutId: 1,
                itemName: 'Aceite'
            }
        };
    }

    function createResponse() {
        return {
            send: () => {},
            setHeader: () => {}
        };
    }
});
