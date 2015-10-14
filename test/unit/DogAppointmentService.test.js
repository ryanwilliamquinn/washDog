var assert = require('assert');
var DogAppointmentService = require('../../api/services/DogAppointmentService.js');
var moment = require('moment');
var tk = require('timekeeper');

describe('Dog appointment service tests', function() {
  before(function(done) {
    // freeze the date, so we have deterministic tests
    var time = moment().year(2015).month('october').date(15).toDate();
    tk.freeze(time);
    done();
  });

  after(function(done) {
    tk.reset();
    done();
  });

  it('should calculate the date of a dogs next appointment', function() {
    var dog = {
      name: 'winnie',
      breed: 'poodle',
      age: 2
    };

    var washDate = DogAppointmentService.calculateWashDate(dog);
    assert(washDate.getDate() == 7);
    assert(washDate.getMonth() == 10);
  });

});
