var assert = require('assert');
var StringReverseService = require('../../api/services/StringReverseService');

describe('string reverse service', function() {

  it('should reverse an input string', function(done) {
    assert(StringReverseService.reverse('winnie') == 'einniw');
    done();
  });

  it('should return an empty string for invalid input', function () {
    assert(StringReverseService.reverse() === '');
  });

});
