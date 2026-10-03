import { atos, stoa } from '../src/index.js'

describe('atos (Array to String)', () => {
  it('should convert a simple array to bracket notation', () => {
    expect(atos(['a', 'b', 'c'])).toBe('a[b][c]')
  })

  it('should work with a mix of strings and numbers', () => {
    expect(atos(['a', '2', 'c', '4'])).toBe('a[2][c][4]')
  })

  it('should handle arrays with special characters', () => {
    expect(atos(['user', 'name with spaces', 'property'])).toBe('user[name with spaces][property]')
    expect(atos(['data', 'value-with-dashes', 'field'])).toBe('data[value-with-dashes][field]')
    expect(atos(['object', 'special!@#$%^&*()', 'item'])).toBe('object[special!@#$%^&*()][item]')
  })

  it('should work with single item arrays', () => {
    expect(atos(['singleItem'])).toBe('singleItem')
  })

  it('accepts readonly tuples without mutating them', () => {
    const parts = Object.freeze(['users', '0', 'name'] as const)
    expect(atos(parts)).toBe('users[0][name]')
    expect(parts).toEqual(['users', '0', 'name'])
  })

  it.each([
    { parts: ['a', '', 'b'], encoded: 'a[][b]', decoded: ['a', 'b'] },
    { parts: ['', 'a'], encoded: '[a]', decoded: ['a'] },
    { parts: ['a', ''], encoded: 'a[]', decoded: ['a'] },
    { parts: [''], encoded: '', decoded: [] },
    { parts: ['a[b]', 'c'], encoded: 'a[b][c]', decoded: ['a', 'b', 'c'] },
    { parts: ['a', 'b]c'], encoded: 'a[b]c]', decoded: ['a', 'b', 'c'] }
  ])('documents lossy conversion of $parts', ({ parts, encoded, decoded }) => {
    expect(atos(parts)).toBe(encoded)
    expect(stoa(atos(parts))).toEqual(decoded)
  })

  it('should handle empty arrays', () => {
    expect(() => atos([])).toThrow()
  })
})
