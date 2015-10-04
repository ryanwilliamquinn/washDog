var Promise = require('bluebird');
var moment = require('moment');
/**
 * DogController
 *
 * @description :: Server-side logic for managing dogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  getDogWashAppointment: function(req, res) {
    Dog.findOne({
        name: req.query.name
      })
      .then(function(dog) {

        if (!dog) {
          return res.notFound();
        }


        var dogWashDate = DogAppointmentService.getWashDate(dog);

        // check groomer availability

        var groomers = dog.groomers;
        var ok;
        // if a dog has no specific groomer, check all the groomers
        if (!groomers || groomers.length === 0) {
          ok = Groomer.find();
        } else {
          ok = Promise.resolve(groomers);
        }

        ok.then(function(groomers) {
          return GroomerService.scheduleAppointment(groomers, dogWashDate);
        }).then(function(appt) {
          if (appt && appt.groomer) {
            res.json({
              date: appt.date,
              groomer: appt.groomer
            });
          } else {
            res.notFound();
          }
        }).catch(function() {
          res.notFound();
        });
      });
  }

};
