# CLAUDE.md - Guidelines for Yek Repository

## Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run build` | Build TypeScript to JavaScript |
| `npm run typecheck` | Check TypeScript types |
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run coverage` | Generate test coverage report |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix linting issues automatically |
| `npm run check` | Run typecheck, lint, and tests |
| `npx vitest run tests/stoa.test.ts` | Run a specific test file |

## Git Workflow

1. Create a feature branch from `main`: `git checkout -b feature/your-feature-name`
2. Make changes and commit with conventional commit format:
   - `feat: add new feature`
   - `fix: fix bug description`
   - `docs: update documentation`
   - `test: add tests`
   - `refactor: refactor code`
3. Run `npm run check` to ensure all checks pass
4. Push your branch and create a pull request
5. GitHub Actions CI will test your changes
6. After approval, merge to `main`

## Code Style Guidelines

- TypeScript with strict mode enabled
- No semicolons
- Single quotes for strings
- 2 space indentation (enforced by ESLint)
- ES modules (import/export)
- Arrow functions preferred
- Vitest for testing
- TSDoc comments with @param and @return
- Type annotations for function parameters and returns
- Tests use Vitest assertions