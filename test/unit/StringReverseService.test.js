var assert = require('assert');

describe('string reverse service', function() {

  it('should reverse an input string', function() {
    assert(StringReverseService.reverse('winnie') == 'einniw');
  });

  it('should return an empty string for invalid input', function () {
    assert(StringReverseService.reverse() === undefined);
  });

});
