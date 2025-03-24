import { describe, it, expect } from 'vitest'
import { stoa } from '../src/index.js'

describe('stoa', () => {
  it('should perform a basic test', () => {
    expect(stoa('a[b][c]')).toEqual(['a', 'b', 'c'])
  })

  it('should always change numbers to strings always', () => {
    expect(stoa('a[1][c]')).toEqual(['a', '1', 'c'])
  })
})