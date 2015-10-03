/**
 *
 * returns the reverse of the input string
 */
module.exports = {

  reverse: function(str) {
    if (!str || !str.length || typeof str != 'string') return '';
    var reverse = [];
    var strlen = str.length;
    for (var i = 0; i < strlen; i++) {
      reverse[strlen - i - 1] = str[i];
    }
    return reverse.join('');
  }

};





/*
module.exports = function(str) {
  var strArr = str.split('');
  var charHolder;
  var strlen = strArr.length;
  var looplen = strlen / 2;
  var endIndex;
  console.log('looplen!', looplen);
  for (var i = 0; i < looplen; i++) {
    endIndex = strlen - 1 - i;
    charHolder = strArr[i];
    strArr[i] = strArr[endIndex]
    strArr[endIndex] = charHolder;
  }
};
*/
