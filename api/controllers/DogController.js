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

        // get the appropriate date for our dog's next bath
        var dogWashDate = DogAppointmentService.calculateWashDate(dog);

        // find the dog's favorite groomers
        GroomerService.getGroomersForDog(dog)
          .then(function(groomers) {

            // check groomer availability
            return GroomerService.scheduleAppointment(groomers, dogWashDate)
              .then(res.json.bind(res))
              .catch(res.notFound.bind(res));
          });
      });
  }

};
