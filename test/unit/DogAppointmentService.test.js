var assert = require('assert');
var DogAppointmentService = require('../../api/services/DogAppointmentService.js');
var tk = require('timekeeper');

describe('Dog appointment service tests', function() {
  before(function(done) {
    // freeze the date, so we have deterministic tests
    // this is October 15th, 2015
    var time = new Date(1444910400000);
    tk.freeze(time);
    done();
  });

  it('should calculate the date of a dogs next appointment', function() {
    var dog = {
      name: 'winnie',
      breed: 'poodle',
      age: 2
    };

    var washDate = DogAppointmentService.getWashDate(dog);
    assert(washDate.getDate() == 7);
    assert(washDate.getMonth() == 10);
  });

});
