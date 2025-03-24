# CLAUDE.md - Guidelines for Yek Repository

## Build/Test Commands
- Install dependencies: `npm install`
- Build TypeScript: `npm run build`
- Type checking: `npm run typecheck`
- Run all tests: `npm test`
- Run in watch mode: `npm run test:watch`
- Run single test: `npx vitest run tests/stoa.test.ts` or `npx vitest run tests/atos.test.ts`
- Coverage: `npm run coverage`

## Code Style Guidelines
- TypeScript with strict mode enabled
- No semicolons
- Single quotes for strings
- 2 space indentation
- ES modules (import/export)
- Arrow functions preferred
- Vitest for testing
- TSDoc comments for all functions with param and return types
- Meaningful variable names
- Explicit type annotations for function parameters and returns
- Prefer modern TypeScript/JavaScript features
- Tests use Vitest's expect assertions

The codebase is a simple utility that converts between array and bracket notation paths.