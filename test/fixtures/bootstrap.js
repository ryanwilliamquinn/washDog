var Promise = require('bluebird');

// create test data in here
module.exports = function(cb) {

  var dogFixtures = Dog.create({
    name: 'turbo',
    breed: 'labrador',
    age: 7
  });

  var groomerFixtures = Groomer.create({
    name: 'stan'
  });

  return Promise.all([dogFixtures, groomerFixtures])
      .nodeify(cb);

};
