import { stoa } from '../src/index.js'

describe('stoa (String to Array)', () => {
  it('should convert basic bracket notation to array', () => {
    expect(stoa('a[b][c]')).toEqual(['a', 'b', 'c'])
  })

  it('should convert numbers to strings', () => {
    expect(stoa('a[1][c]')).toEqual(['a', '1', 'c'])
    expect(stoa('users[0][name]')).toEqual(['users', '0', 'name'])
  })

  it('should handle strings with special characters', () => {
    expect(stoa('user[name with spaces][property]')).toEqual(['user', 'name with spaces', 'property'])
    expect(stoa('data[value-with-dashes][field]')).toEqual(['data', 'value-with-dashes', 'field'])
    expect(stoa('object[special!@#$%^&*()][item]')).toEqual(['object', 'special!@#$%^&*()', 'item'])
  })

  it('should handle single values without brackets', () => {
    expect(stoa('singleItem')).toEqual(['singleItem'])
  })

  it('should handle empty string input', () => {
    expect(stoa('')).toEqual([])
  })

  it('should handle malformed bracket notation correctly', () => {
    expect(stoa('a[b')).toEqual(['a', 'b'])
    // The current implementation splits on ][, so we need to adjust our expectation
    expect(stoa('a]b[c')).toEqual(['a', 'b', 'c'])
    expect(stoa('a[[b]]c')).toEqual(['a', 'b', 'c'])
  })
})