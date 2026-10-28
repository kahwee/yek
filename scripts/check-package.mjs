import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const consumer = mkdtempSync(join(tmpdir(), 'yek-package-'))
const pnpm = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'

try {
  const tarball = join(consumer, 'yek.tgz')
  execFileSync(pnpm, ['pack', '--out', tarball], { cwd: root, stdio: 'pipe' })
  writeFileSync(join(consumer, 'package.json'), JSON.stringify({ private: true, type: 'module' }))
  execFileSync(pnpm, [
    'add', tarball, '--ignore-scripts', '--lockfile=false'
  ], { cwd: consumer, stdio: 'pipe' })

  const installedRoot = join(consumer, 'node_modules', 'yek')
  const documents = ['README.md', 'docs/migration-v3.md'].map((file) => ({
    file,
    contents: readFileSync(join(installedRoot, file), 'utf8')
  }))
  for (const { file, contents } of documents) {
    for (const [, target] of contents.matchAll(/\[[^\]]*\]\(([^\s)]+)\)/g)) {
      if (target.startsWith('#') || /^[a-z][a-z\d+.-]*:/i.test(target)) continue
      const destination = resolve(dirname(join(installedRoot, file)), target.split('#')[0])
      assert.ok(existsSync(destination), `Packed ${file} has a broken local link: ${target}`)
    }
  }

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

  writeFileSync(join(consumer, 'check.cjs'), `
const assert = require('node:assert/strict')
assert.throws(() => require('yek'), { code: 'ERR_PACKAGE_PATH_NOT_EXPORTED' })
import('yek').then(({ atos, stoa }) => {
  assert.equal(atos(['users', '0', 'name']), 'users[0][name]')
  assert.deepEqual(stoa('users[0][name]'), ['users', '0', 'name'])
})
`)
  execFileSync(process.execPath, ['check.cjs'], { cwd: consumer, stdio: 'inherit' })

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
  console.log('Packed package documentation links, runtime exports, and TypeScript declarations verified.')
} finally {
  rmSync(consumer, { recursive: true, force: true })
}
