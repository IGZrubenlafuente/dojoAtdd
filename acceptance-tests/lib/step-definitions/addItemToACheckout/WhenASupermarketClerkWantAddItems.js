'use strict';

const requestPromise = require('request-promise');

module.exports = function() {

    this.When(/^a supermarket clerk want add a "([^"]*)"$/, function(itemName, done) {
    	
        const world = this;
    	const response = world.getValue('checkoutCreationResponse');
        //console.log("response.headers.location: "+ response.headers.location + "/items/"+ itemName);
        const options = {
            method: 'POST',
            uri: response.headers.location + "/items",
            json: {
                "itemName": itemName
            },
            resolveWithFullResponse: true
        };

        requestPromise(options)
            .then(function(response) {
                world.publishValue('checkoutItemAddedResponse', response);
                //world.publishValue('code', code);
                done();
            })
            .catch(function(err) {
                done(err);
            });
    });
};
