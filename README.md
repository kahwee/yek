# yek

Convert arrays of path segments to bracket notation and back. ESM-only, with
TypeScript declarations and no runtime dependencies.

## Install

```sh
npm install yek
```

## Use

```ts
import { atos, stoa } from 'yek'

atos(['one', 'two', 'three']) // 'one[two][three]'
stoa('one[two][three]')      // ['one', 'two', 'three']
```

`atos` joins an array into a path; `stoa` splits a path into segments. See the
[implementation](src/index.ts) and [behavior tests](tests/) for edge cases.

## Development

Use the Node version selected by CI (26) and the committed npm lockfile:

```sh
npm ci
npm run check
npm run coverage
npm run build
```

`check` runs types, lint, and tests. Coverage reports statements, functions,
lines, and branches separately; branch coverage is not 100%.

The current checkout emits `dist/src/index.js`, while package.json points to
`dist/index.js`. Source exports are present, but package self-import from a fresh
build fails until that packaging mismatch is fixed. Do not treat a successful
TypeScript build as package loading verification.
[CLAUDE.md](CLAUDE.md) contains contributor guidance.

## License

MIT
