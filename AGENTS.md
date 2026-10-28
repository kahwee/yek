# Repository guidance

`yek` exports named ESM functions `atos` and `stoa` through `src/index.ts`.
Preserve their bracket-notation behavior and TypeScript declarations.
The v3 package requires Node 22+ and emits ES2022; keep consumer tests and
[the migration guide](docs/migration-v3.md) aligned with that contract.

- Use pnpm 12.15.0 and `pnpm-lock.yaml`; install with `pnpm install --frozen-lockfile`. Development uses Node 26; CI verifies Node 22, 24, and 26.
- Run `pnpm run check`, `pnpm run coverage`, and `pnpm run build` for source or
  dependency changes. `check` runs typecheck, lint, and Vitest tests.
- Match the repository's strict TypeScript and Biome configuration. Keep
  tests in `tests/`; focused tests use `pnpm exec vitest run tests/stoa.test.ts`.
- Check examples against the built named exports and the package entry path.
  Run `pnpm run test:package` after building to verify the package entry.
  Do not claim 100% branch coverage or add CommonJS usage without implementing it.

- CI runs type checking, lint, and coverage in parallel, then builds and checks
  the packed ESM package. Keep build-dependent checks ordered.
- Preserve workflow permissions. The OIDC publisher in `.github/release-proposals/`
  is inactive; activating it or changing registry trust requires separate approval.
  Do not create releases, tags, or publish a version as a maintenance test.
