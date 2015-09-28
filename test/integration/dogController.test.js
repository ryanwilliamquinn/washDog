var assert = require('assert');
var request = require('supertest');

describe('dog controller tests', function() {

  it('should return a dog wash appointment for a good dog', function(done) {
    request(sails.hooks.http.app)
      .get('/appointment?name=turbo')
      .expect(200)
      .end(function(err, res) {
        // there should be no error
        assert.ifError(err);

        var appointment = res.body;
        var dogWashDate = new Date(appointment.dogWashDate);

        // all i am comfortable asserting right now is that the date should be in the future
        assert(dogWashDate.getTime() > new Date().getTime());

        // not totally sure there is going to be a groomer, we get availability from 3rd party service
        assert(appointment.groomers.length === 1);
        done();
      });
  });

  it('should not return an appointment for an unknown dog', function(done) {
    request(sails.hooks.http.app)
      .get('/appointment?name=smeagle')
      .expect(404)
      .end(function(err, res) {
        done();
      });
  });


  // Set up fixture data for all the different scenarios you could imagine
  // Note that there is a problem here, because we are scheduling dog wash appointments with the groomers
});
