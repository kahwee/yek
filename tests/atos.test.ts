import { describe, it, expect } from 'vitest'
import { atos } from '../src/index.js'

describe('atos', () => {
  it('should perform a basic test', () => {
    expect(atos(['a', 'b', 'c'])).toBe('a[b][c]')
  })

  it('should work with a mix of numerical strings and numbers', () => {
    expect(atos(['a', '2', 'c', '4'])).toBe('a[2][c][4]')
  })
})