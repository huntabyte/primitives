# Contributing to Bits UI

Thank you for your interest in contributing to Bits UI! We aim to make UI development more efficient and enjoyable, and we're excited to have you join us. This guide will help you get started with contributing to the project.

## Development Prerequisites

-   Node.js (v18 or higher)
-   pnpm (v8.7 or higher)
-   Knowledge of Svelte 5 and TypeScript

## Getting Started

Before spending time on a PR, if the change is non-trivial, it's best to first discuss the change you wish to make via an issue or a discussion in the [Discussions](https://github.com/huntabyte/bits-ui/discussions) section. Sometimes a feature not existing is by design, and it's better to discuss the idea and implementation before investing time in it.

For small bug fixes and typos, feel free to open a PR directly.

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/<YOUR_USERNAME>/bits-ui.git
cd bits-ui
```

3. Install dependencies:

```bash
pnpm install
```

4. Create a new branch:

```bash
git switch -C feature/your-feature-name
```

> [!IMPORTANT]
> Don't submit a pull request from your `main` branch as it prevents us from making changes to the branch during review.

## Development Workflow

1. Start the development server:

```bash
pnpm dev
```

This will start the documentation dev server at `http://localhost:5173` and also starts a watch process that will automatically rebuild the package code when it changes and reload the documentation page.

1. Make your changes
2. Write or update tests in the `packages/tests` directory (we have a separate test package to test from the consumer of the package's perspective)
3. Run tests to ensure everything passes:

```bash
pnpm test
```

5. Run Svelte check:

```bash
pnpm check
```

6. Run formatting:

```bash
pnpm format
```

7. Run linting:

```bash
pnpm lint
```

## Project Structure

Bits UI is a monorepo that contains the following packages:

-   `packages/bits-ui`: What you know as `bits-ui` itself (this is the main package published to npm)
-   `packages/tests`: A package dedicated to testing the `bits-ui` package. We separate this from the package itself to test from a consumer's perspective.
-   `sites/docs`: The documentation site for Bits UI

## Component Logic

The core of the logic for Bits UI components are in each component's respective `.svelte.ts` file. These files contain classes that manage the state of the component and all sub-components in a single file. We've found this pattern to be a more efficient way of developing multi-file components without needing to jump back and forth between files.

## Coding Standards

### TypeScript

-   Use TypeScript for all new code
-   Maintain strict type safety (avoid `any` types unless absolutely necessary)
-   Document complex or non-obvious logic in the form of comments
-   Follow the existing type and variable naming conventions
-   Functions > Arrow functions (except where `this` gets in the way)
-   `let` for variables that can be _reassigned_, `const` for everything else. Yes, `const` for `$derived`. You can't reassign a `$derived`.

### General

-   Use prettier for code formatting
-   Follow existing naming conventions
-   Keep PRs small and focused unless implementing a feature from scratch

## Pull Request Process

1. Update documentation if you're changing functionality
2. Add tests for new features
3. Ensure all tests pass and types check
4. Update the CHANGELOG.md following semantic versioning
5. Submit your PR with a clear description of the changes
6. Link any related issues
7. Don't add a Changeset when you're submitting a PR, one of the maintainers will handle that

### PR Title Format

Follow the conventional commits specification:

-   `feat: add new component`
-   `fix: resolve issue with component`
-   `docs: update component documentation` or `docs: fix typo in Button`
-   `chore: update dependencies`
-   `refactor: improve component structure`

## Documentation

-   Update documentation for any changed functionality
-   Add usage demos for new features when it makes sense
-   Keep documentation clear and concise

## Need Help?

-   Check existing issues and discussions
-   Join our [Discord](https://discord.gg/fdXy3Sk8Gq) community
-   Review the documentation
-   Ask in [Discussions](https://github.com/huntabyte/bits-ui/discussions)

## License

By contributing to Bits UI, you agree that your contributions will be licensed under its MIT license.
