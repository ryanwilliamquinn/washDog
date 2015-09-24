/**
 * Dog.js
 *
 * @description :: Dog attributes required to determine if puppy needs a bath
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    breed: 'string',
    age: 'integer',
    mood: {
      type: 'string',
      enum: ['fantastic', 'wonderful', 'great', 'happy', 'sad']
    },
    lastBath: 'date',
    groomers: {
        collection: 'groomer',
        via: 'dogs'
    },
    blacklistGroomers: {
        collection: 'groomer',
        via: 'badDogs'
    }

  }
};
