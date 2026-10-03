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

`atos` accepts mutable or readonly arrays and throws for an empty array.
`stoa('')` returns `[]`.

Conversion round-trips when segments are nonempty and contain neither `[` nor
`]`. There is no escaping: `stoa` splits on either bracket, discards empty
segments, and accepts malformed notation. For example:

```ts
stoa(atos(['a', '', 'b'])) // ['a', 'b']
stoa(atos(['a[b]', 'c'])) // ['a', 'b', 'c']
stoa('a[b')              // ['a', 'b']
```

See the [behavior tests](tests/) for more examples.

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

`build` emits `dist/index.js` and its declaration. Run `npm run test:package`
after building to pack and install the tarball in a temporary consumer, verify
named exports, and compile TypeScript usage against the shipped declarations.
[CLAUDE.md](CLAUDE.md) contains contributor guidance.

## License

MIT
