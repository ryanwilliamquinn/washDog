var Promise = require('bluebird');
module.exports = {
    checkAvailability: function (groomer, date) {
       return Promise.delay(2000)
           .then(function () {
                return Math.random() > 0.5;
           });
    }
};
