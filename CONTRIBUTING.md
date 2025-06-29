# Contributing Guide

Thank you for considering contributing to React Velocity Starter! This guide will help you get started.

## Development Setup

### Prerequisites
- Node.js 18+ (LTS recommended)
- pnpm 9+ (preferred package manager)

### Local Development
1. Fork and clone the repository
2. Install dependencies: `pnpm install`
3. Start development server: `pnpm dev`
4. Make your changes
5. Run tests: `pnpm test`
6. Check linting: `pnpm lint`
7. Build to verify: `pnpm build`

## Code Standards

### TypeScript
- Use strict TypeScript configuration
- Prefer interfaces over types for object shapes
- Use proper generic constraints
- Avoid `any` type (use `unknown` instead)

### React
- Use functional components with hooks
- Prefer named exports over default exports
- Use proper prop typing with interfaces
- Follow React best practices for performance

### Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use CSS variables for theme customization
- Prefer composition over customization

### Testing
- Write tests for all new components
- Use React Testing Library for component tests
- Mock external dependencies
- Aim for >80% test coverage

### Code Organization
- Follow feature-based architecture
- Use proper import/export patterns
- Keep components small and focused
- Separate concerns (UI, logic, data)

## Commit Convention

We use conventional commits for better changelog generation:

```
type(scope): description

feat(auth): add login functionality
fix(ui): resolve button alignment issue
docs(readme): update installation guide
test(utils): add utility function tests
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## Pull Request Process

1. **Create a feature branch** from `main`
2. **Make your changes** following the code standards
3. **Add tests** for new functionality
4. **Update documentation** if needed
5. **Run the full test suite**: `pnpm test && pnpm test:e2e`
6. **Check code quality**: `pnpm lint && pnpm typecheck`
7. **Create a pull request** with a clear description

### PR Requirements
- [ ] All tests pass
- [ ] No linting errors
- [ ] TypeScript compiles without errors
- [ ] Documentation updated (if applicable)
- [ ] Breaking changes noted (if applicable)

## Project Structure Guidelines

### Components
- Keep components small and focused
- Use composition over inheritance
- Implement proper error boundaries
- Follow accessibility guidelines

### Features
- Self-contained modules
- Clear API boundaries
- Proper state management
- Comprehensive testing

### Utilities
- Pure functions when possible
- Proper error handling
- Comprehensive documentation
- Unit tests for all utilities

## Performance Guidelines

### Bundle Size
- Keep bundle size minimal
- Use dynamic imports for large dependencies
- Implement proper code splitting
- Monitor bundle analysis

### Runtime Performance
- Avoid unnecessary re-renders
- Use proper memoization
- Implement virtual scrolling for large lists
- Optimize images and assets

## Accessibility

- Use semantic HTML elements
- Implement proper ARIA labels
- Ensure keyboard navigation
- Test with screen readers
- Maintain proper color contrast

## Documentation

### Code Documentation
- Use JSDoc for complex functions
- Document component props
- Explain complex logic
- Provide usage examples

### README Updates
- Keep examples up-to-date
- Document new features
- Update installation guide
- Maintain troubleshooting section

## Release Process

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create release tag
4. Publish to npm (if applicable)
5. Update documentation

## Getting Help

- Check existing issues and discussions
- Read the documentation thoroughly
- Ask questions in discussions
- Join our community channels

## Code of Conduct

Please follow our Code of Conduct in all interactions:
- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Maintain a professional tone

Thank you for contributing! 🚀