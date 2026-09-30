# Repository guidance

`yek` exports named ESM functions `atos` and `stoa` through `src/index.ts`.
Preserve their bracket-notation behavior and TypeScript declarations.

- Use npm and `package-lock.json`; install with `npm ci`. CI uses Node 26.
- Run `npm run check`, `npm run coverage`, and `npm run build` for source or
  dependency changes. `check` runs typecheck, lint, and Vitest tests.
- Match the repository's strict TypeScript and ESLint configuration. Keep
  tests in `tests/`; focused tests use `npx vitest run tests/stoa.test.ts`.
- Check examples against the built named exports and the package entry path.
  Run `npm run test:package` after building to verify the package entry.
  Do not claim 100% branch coverage or add CommonJS usage without implementing it.
