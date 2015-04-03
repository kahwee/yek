/**
 * This changes a str:
 *  one[two][three]
 * Into an array:
 *  ["one", "two", "three"]
 * @param  {[type]} pathInStr [description]
 * @return {[type]}           [description]
 */
module.exports = function(pathInStr) {
	return pathInStr.split(/[\[\]]+/).filter(function(segment) {
		return segment ? segment : undefined;
	});
};
