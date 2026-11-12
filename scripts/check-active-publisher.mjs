import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'

const source = readFileSync(new URL('../.github/workflows/publish.yml', import.meta.url), 'utf8')

function assertIsolated(workflow) {
  const [build, rest] = workflow.split('\n  publish:\n')
  const [publish, verify] = rest.split('\n  verify:\n')
  assert.doesNotMatch(workflow, /id-token: write/)
  assert.doesNotMatch(build, /secrets\.|NODE_AUTH_TOKEN/)
  assert.doesNotMatch(verify, /secrets\.|NODE_AUTH_TOKEN/)
  assert.match(publish, /needs: build/)
  assert.doesNotMatch(publish, /actions\/checkout|pnpm\/action-setup|setup-bun/)
  assert.doesNotMatch(publish, /(?:npm|pnpm|bun) (?:install|ci|run)|node scripts\//)
  assert.match(publish, /npm publish "\$RUNNER_TEMP\/release\/package.tgz" --ignore-scripts/)
  assert.match(publish, /--tag latest --registry https:\/\/registry\.npmjs\.org\//)
  assert.match(publish, /NODE_AUTH_TOKEN: \$\{\{ secrets.NPM_TOKEN \}\}/)
  assert.match(publish, /sha256sum --check --strict/)
  assert.match(verify, /--verify-archive/)
}

test('existing token publisher isolates credentials and leaves OIDC inactive', () => {
  assertIsolated(source)
})

test('rejects regression to credential-bearing package hooks or OIDC activation', () => {
  // biome-ignore lint/suspicious/noTemplateCurlyInString: Literal GitHub Actions expression in a regression fixture.
  assert.throws(() => assertIsolated(source.replace('  build:\n', '  build:\n    token: ${{ secrets.NPM_TOKEN }}\n')))
  assert.throws(() => assertIsolated(source.replace('  publish:\n', '  publish:\n    run: pnpm install\n')))
  assert.throws(() =>
    assertIsolated(source.replace('  publish:\n', '  publish:\n    permissions:\n      id-token: write\n'))
  )
})

test('actual publisher metadata guard rejects unexpected identities and publish configuration', () => {
  const publish = source.split('\n  publish:\n')[1].split('\n  verify:\n')[0]
  const script = publish.match(/node --input-type=module <<'JS'\n([\s\S]*?)\n {10}JS/)[1].replace(/^ {10}/gm, '')
  const directory = mkdtempSync(join(tmpdir(), 'yek-publish-'))
  const valid = { name: 'yek', version: '3.0.0' }
  try {
    for (const [pkg, tag, passes] of [
      [valid, 'v3.0.0', true],
      [{ ...valid, name: 'other' }, 'v3.0.0', false],
      [{ ...valid, private: true }, 'v3.0.0', false],
      [{ ...valid, publishConfig: { registry: 'https://example.com' } }, 'v3.0.0', false],
      [valid, 'v3.0.1', false],
      [valid, 'v3.0.0-rc.1', false]
    ]) {
      writeFileSync(join(directory, 'packed-package.json'), JSON.stringify(pkg))
      const result = spawnSync(process.execPath, ['--input-type=module', '-e', script], {
        env: { ...process.env, RUNNER_TEMP: directory, RELEASE_TAG: tag },
        encoding: 'utf8'
      })
      assert.equal(result.status === 0, passes, result.stderr)
    }
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
