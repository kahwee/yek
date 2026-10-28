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

See the [behavior tests](https://github.com/kahwee/yek/tree/main/tests) for more examples.

Version 3 requires Node.js 22+ and provides named ESM exports only.
See the [v3 migration guide](docs/migration-v3.md) when upgrading from v2.

## Development

Use Node 26 and pnpm 12.15.0 (pinned in `package.json`) with the committed
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
[AGENTS.md](https://github.com/kahwee/yek/blob/main/AGENTS.md) contains contributor guidance.

## License

MIT

## CI maintenance

[GitHub Actions maintenance](https://github.com/kahwee/yek/blob/main/.github/ACTIONS.md) covers workflows, parallel checks, action versions, and weekly updates.
