var request = require('request');

module.exports = {
  scheduleAppointment: function(groomers, date) {
    return new Promise(function(resolve, reject) {
      request.post({
        url: 'http://localhost:1400/scheduleGroomer',
        form: {
          groomers: groomers,
          date: date
        }
      }, function(err, res, body) {
        if (err) return reject(err);
        resolve(JSON.parse(body));
      });
    });
  },

  getGroomersForDog: function(dog) {
    if (dog.groomers.length > 0) {
      return Promise.resolve(dog.groomers);
    }
    return Groomer.find();
  }
};
