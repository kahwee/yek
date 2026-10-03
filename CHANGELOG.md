## v3.0.0 (unreleased)

- Migrate installs, package verification, publishing, and GitHub Actions to pinned pnpm 12.8.1.

- Accept readonly path arrays and document/test lossy empty and bracket-containing segments.
- Verify the packed package in an isolated runtime and TypeScript consumer before publishing.
- Update development dependencies, including Vitest 5 and TypeScript 6 (the latest supported by the lint tooling).

- Emit the declared package entry directly under `dist/` and keep test artifacts out of the build.
- Verify named package imports after building in CI.

## v2.0.1 -- 2015-11-25
* Updates for dependencies

## v2.0.0 -- 2015-04-03
* Changed `key` to `atos`
* Changed `yek` to `stoa`

## v1.0.0 -- 2015-04-03
* Initial release
