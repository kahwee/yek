import { describe, it, expect } from 'vitest'
import { atos } from '../src/index.js'

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

  it('should handle empty arrays', () => {
    expect(() => atos([])).toThrow()
  })
})