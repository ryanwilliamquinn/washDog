var moment = require('moment');
  /**
   * Bootstrap
   * (sails.config.bootstrap)
   *
   * An asynchronous bootstrap function that runs before your Sails app gets lifted.
   * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
   *
   * For more information on bootstrapping your app, check out:
   * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
   */

module.exports.bootstrap = function(cb) {


  Dog.count().then(function(numDogs) {
      if (numDogs > 0) {
        return;
      }

      return Promise.all([
        Dog.create([{
          name: 'winnie',
          breed: 'poodle',
          age: 1,
          mood: 'fantastic',
          lastBath: moment().subtract(2, 'weeks').toDate()
        }]), Groomer.create([{
          name: 'suzie'
        }, {
          name: 'wally'
        }, {
          name: 'mary'
        }])
      ]);



    })
    .then(function() {
      cb();
    })
    .catch(cb);

};
