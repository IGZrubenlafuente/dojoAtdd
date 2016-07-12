
'use strict';

require('chai').should();

module.exports = function() {

    this.Then(/^the checkout has "([^"]*)" in the total value$/, function (totalWithCurrency, done) {
    	const totalAmount = parseFloat(totalWithCurrency.split(" ")[0]);
    	const currency = totalWithCurrency.split(" ")[1];
        const world = this;

        const response = world.getValue('checkoutItemAddedResponse');
		const expectedResponse = {
            total: {
                value: totalAmount,
                currency: currency
            }
        }
        //response.statusCode.should.equal(201);

        response.body.should.be.deep.equal(expectedResponse);

        //response.headers.location.should.be.equal('http://localhost:3000/api/checkouts/' + world.getValue('code'));

        done();
    });

};
