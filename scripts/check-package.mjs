import { execFileSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const consumer = mkdtempSync(join(tmpdir(), 'yek-package-'))
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'

try {
  const packed = JSON.parse(execFileSync(npm, [
    'pack', '--json', '--ignore-scripts', '--pack-destination', consumer
  ], { cwd: root, encoding: 'utf8' }))
  writeFileSync(join(consumer, 'package.json'), JSON.stringify({ private: true, type: 'module' }))
  execFileSync(npm, [
    'install', join(consumer, packed[0].filename),
    '--ignore-scripts', '--no-audit', '--no-fund', '--package-lock=false'
  ], { cwd: consumer, stdio: 'pipe' })

  writeFileSync(join(consumer, 'check.mjs'), `
import assert from 'node:assert/strict'
import { atos, stoa } from 'yek'
const parts = Object.freeze(['one', 'two', 'three'])
assert.equal(atos(parts), 'one[two][three]')
assert.deepEqual(stoa(atos(parts)), parts)
assert.throws(() => atos([]))
assert.deepEqual(stoa(''), [])
assert.deepEqual(stoa('a[][b]'), ['a', 'b'])
`)
  execFileSync(process.execPath, ['check.mjs'], { cwd: consumer, stdio: 'inherit' })

  writeFileSync(join(consumer, 'check.ts'), `
import { atos, stoa } from 'yek'
const parts = ['users', '0', 'name'] as const
const encoded: string = atos(parts)
const decoded: string[] = stoa(encoded)
// @ts-expect-error path segments must be strings
atos([1])
// @ts-expect-error the parser requires a string
stoa(decoded)
// @ts-expect-error the encoder returns a string
const wrong: number = atos(parts)
`)
  const tsc = join(root, 'node_modules/typescript/bin/tsc')
  for (const [module, resolution] of [['NodeNext', 'NodeNext'], ['ESNext', 'Bundler']]) {
    execFileSync(process.execPath, [
      tsc, '--noEmit', '--strict', '--target', 'ES2022',
      '--module', module, '--moduleResolution', resolution, 'check.ts'
    ], { cwd: consumer, stdio: 'inherit' })
  }
  console.log('Packed package runtime exports and TypeScript declarations verified.')
} finally {
  rmSync(consumer, { recursive: true, force: true })
}
