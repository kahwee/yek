# Repository guidance

`yek` exports named ESM functions `atos` and `stoa` through `src/index.ts`.
Preserve their bracket-notation behavior and TypeScript declarations.

- Use pnpm 12.8.1 and `pnpm-lock.yaml`; install with `pnpm install --frozen-lockfile`. CI uses Node 26.
- Run `pnpm run check`, `pnpm run coverage`, and `pnpm run build` for source or
  dependency changes. `check` runs typecheck, lint, and Vitest tests.
- Match the repository's strict TypeScript and Biome configuration. Keep
  tests in `tests/`; focused tests use `pnpm exec vitest run tests/stoa.test.ts`.
- Check examples against the built named exports and the package entry path.
  Run `pnpm run test:package` after building to verify the package entry.
  Do not claim 100% branch coverage or add CommonJS usage without implementing it.
