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
          Promise.map(groomers, function(groomer) {
            return GroomerService.checkAvailability(groomer, dogWashDate)
              .then(function(isAvailable) {
                if (isAvailable) {
                  return groomer;
                }
              });
          }).then(function(availableGroomers) {
            res.ok({
              dogWashDate: dogWashDate,
              groomers: _.compact(availableGroomers)
            });
          });
        });


      });
  }

};
