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
  }
};
