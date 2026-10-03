# yek

Convert arrays of path segments to bracket notation and back. ESM-only, with
TypeScript declarations and no runtime dependencies.

## Install

```sh
pnpm add yek
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

Use Node 26 and pnpm 12.8.1 (pinned in `package.json`) with the committed
`pnpm-lock.yaml`:

```sh
pnpm install --frozen-lockfile
pnpm run check
pnpm run coverage
pnpm run build
```

`check` runs types, Biome checks, and tests. `pnpm run lint` checks lint rules,
formatting, and imports in `src/` and `tests/`; `pnpm run lint:fix` applies fixes.
Coverage reports statements, functions, lines, and branches separately;
branch coverage is not 100%.

`build` emits `dist/index.js` and its declaration. Run `pnpm run test:package`
after building to pack and install the tarball in a temporary consumer, verify
named exports, and compile TypeScript usage against the shipped declarations.
[CLAUDE.md](CLAUDE.md) contains contributor guidance.

## License

MIT
