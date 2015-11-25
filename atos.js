/**
 * This changes an array:
 *  ["one", "two", "three"]
 * Into a str:
 *  one[two][three]
 * @param  {[type]} pathInArray [description]
 * @return {[type]}             [description]
 */
module.exports = function (pathInArray) {
  return pathInArray.reduce(function (previousValue, currentValue, index, array) {
    if (!index) {
      return currentValue
    } else {
      return previousValue + '[' + currentValue + ']'
    }
  })
}
