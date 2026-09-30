import assert from 'node:assert/strict'
import { atos, stoa } from 'yek'

const parts = ['one', 'two', 'three']
assert.equal(atos(parts), 'one[two][three]')
assert.deepEqual(stoa(atos(parts)), parts)
console.log('Built package entry and named exports are loadable.')
