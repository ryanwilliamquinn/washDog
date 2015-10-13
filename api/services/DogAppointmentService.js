var moment = require('moment');

module.exports = {

  calculateWashDate: function(dog) {

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

    var dogWashDate = moment().add(dogWashingInterval, 'days');
    return dogWashDate.toDate();
  }
};
