var Promise = require('bluebird');
var moment = require('moment');
var request = require('request');
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

        // check the dog breed, this is a string of dog breeds joined by ":",
        // for example "pomeranian:chihuaua:shihtzu"
        var breeds = dog.breed.split(":");
        var dogWashingInterval = 30;

        breeds.forEach(function(breed, index) {
          var breedModifier;
          switch (breed) {
            case "labrador":
              breedModifier = 30;
              break;
            case "poodle":
              breedModifier = -7;
              break;
            case "bernese":
              breedModifier = -15;
              break;
            case "oldEnglishSheepdog":
              breedModifier = -5;
              break;
            case "chihuaua":
              breedModifer = 100;
              break;
            default:
              breedModifier = 0;
          }

          dogWashingInterval += (breedModifier / (index + 1));
        });


        //TODO should incorporate average age of breeds here
        // if the dog is little, it probably needs a bath
        if (dog.age < 1) {
          dogWashingInterval /= 2;
        } else if (dog.age > 15) {
          // old dogs get to do whatever they want, and they generally dont want baths
          dogWashingInterval = 9999999;
        }

        var dogWashDate = moment().add(dogWashingInterval, 'days').toDate();
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
          return new Promise(function(resolve, reject) {
            // check if the groomers are available for the dog wash date
            request.post({
              url: "http://groomerscheduler.com:1400/scheduleGroomer",
              form: {
                groomers: groomers,
                date: dogWashDate
              }
            }, function(err, response, body) {
              if (!err && response.statusCode == 200) {
                return res.ok(JSON.parse(body));
              }
              res.badRequest();
            });
          });
        });
      });
  }

};
