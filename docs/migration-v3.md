# Migrating to v3

Version 3 requires Node.js 24 or newer. It publishes named ESM exports and
TypeScript declarations; there is no CommonJS `require()` entry or default export.

```js
import { atos, stoa } from 'yek'

atos(['users', '0', 'name']) // 'users[0][name]'
stoa('users[0][name]') // ['users', '0', 'name']
```

Use an `.mjs` file or a project with `"type": "module"`. A CommonJS application
can use asynchronous dynamic import instead:

```js
async function encode() {
  const { atos } = await import('yek')
  return atos(['users', '0', 'name'])
}
```

`atos([])` throws. `stoa('')` returns an empty array; the parser tolerates malformed
brackets and discards empty segments. Empty keys or keys containing brackets do
not round-trip. This is bracket-notation conversion, not a parser for arbitrary
property expressions.

CI checks source tests, the built package, and isolated installed-package runtime
and declaration consumers on Node.js 24 and 26. The build emits ES2022.
