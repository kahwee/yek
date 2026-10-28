# GitHub Actions

## Verification

[`ci.yml`](workflows/ci.yml) runs on pushes and pull requests to `main`, using
Node 26 and the pnpm version in `package.json`. Frozen installation precedes
parallel type checking, Biome checks, and coverage. All three must pass before
the build and isolated packed-package consumer test run.

Parallel steps share a workspace: keep build and package verification ordered.
The workflow has read-only contents access and cancels superseded CI runs.

## Stable action pins

| Action | Release | Commit |
| --- | --- | --- |
| [actions/checkout](https://github.com/actions/checkout/releases/tag/v7.0.1) | v7.0.1 | `3d3c42e5aac5ba805825da76410c181273ba90b1` |
| [actions/setup-node](https://github.com/actions/setup-node/releases/tag/v7.1.0) | v7.1.0 | `949feb2413d6458794dcd2491c4babbbce0c15c1` |
| [pnpm/action-setup](https://github.com/pnpm/action-setup/releases/tag/v6.1.0) | v6.1.0 | `ea17c68df8912ef543352723c149a84f56e3d413` |

[Dependabot](dependabot.yml) checks Actions weekly. Verify upstream release
commits and runner requirements before updating pins. Preserve permissions,
required checks, and artifact ordering; verify the exact pushed commit in CI.

## Publishing boundary

The active [`publish.yml`](workflows/publish.yml) handles published releases,
validates metadata, and references the existing `NPM_TOKEN` secret. Its presence
does not establish that registry credentials are configured or working.

The [OIDC replacement](release-proposals/publish.yml) remains inactive pending
separate approval. Do not activate it, change registry trust, or publish a release
solely to test maintenance changes.
