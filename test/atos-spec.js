'use strict'
// Note this is small letters
var expect = require('chai').expect
var yek = require('../')

describe('atos', function () {
  it('should perform a basic test', function () {
    expect(yek.atos(['a', 'b', 'c'])).to.equal('a[b][c]')
  })

  it('should work with a mix of numerical strings and numbers', function () {
    expect(yek.atos(['a', '2', 'c', 4])).to.equal('a[2][c][4]')
  })
})
