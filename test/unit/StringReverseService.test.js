var assert = require('assert');
var StringReverseService = require('../../api/services/StringReverseService');

describe('string reverse service', function() {

  it('should reverse an input string', function() {
    assert.equal(StringReverseService.reverse('winnie'), 'einniw');
  });

  it('should return an empty string for invalid input', function () {
    assert.equal(StringReverseService.reverse(), '');
  });

});
