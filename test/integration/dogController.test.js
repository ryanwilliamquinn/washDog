var assert = require('assert');
var request = require('supertest');
var sinon = require('sinon');
var Promise = require('bluebird');
var moment = require('moment');

describe('dog controller tests', function() {

  it('should return a dog wash appointment for a good dog', function(done) {

    var groomerAppointmentDate = moment().add(30, 'days').format();
    var schedulerStub = sinon.stub(sails.services.groomerservice, 'scheduleAppointment', function () {
        return Promise.resolve({
            date: groomerAppointmentDate,
            groomer: {
                name: 'carrie'
            }
        });
    });

    request(sails.hooks.http.app)
      .get('/appointment?name=turbo')
      .expect(200)
      .end(function(err, res) {
        // there should be no error
        assert.ifError(err);

        var appointment = res.body;

        // all i am comfortable asserting right now is that the date should be in the future
        assert(appointment.date == groomerAppointmentDate);
        assert(appointment.groomer.name == 'carrie');

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
