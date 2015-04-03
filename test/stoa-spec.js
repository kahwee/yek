'use strict';
// Note this is small letters
var expect = require('chai').expect;
var yek = require('../');

describe('stoa', function() {
	it('should perform a basic test', function() {
		expect(yek.stoa('a[b][c]')).to.deep.equal(['a', 'b', 'c']);
	});

	it('should always change numbers to strings always', function() {
		expect(yek.stoa('a[1][c]')).to.deep.equal(['a', '1', 'c']);
	});
});
