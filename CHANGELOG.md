## v3.0.0 (unreleased)

- Refresh Biome to 2.6.3, Vitest and coverage to 5.0.5, and pnpm to 12.15.0.
- Pin the current stable GitHub Actions to immutable commits and consolidate
  contributor guidance in `AGENTS.md`.

- Refresh Node.js development types to 26.6.5.
- Add the MIT `LICENSE` file so the packed package matches the declared license.
- Migrate installs, package verification, publishing, and GitHub Actions to pinned pnpm 12.8.1.

- Accept readonly path arrays and document/test lossy empty and bracket-containing segments.
- Verify the packed package in an isolated runtime and TypeScript consumer before publishing.
- Update development dependencies, including Vitest 5 and TypeScript 7.
- Replace ESLint with Biome for linting, formatting, and import checks.

- Emit the declared package entry directly under `dist/` and keep test artifacts out of the build.
- Verify named package imports after building in CI.

## v2.0.1 -- 2015-11-25
* Updates for dependencies

## v2.0.0 -- 2015-04-03
* Changed `key` to `atos`
* Changed `yek` to `stoa`

## v1.0.0 -- 2015-04-03
* Initial release
