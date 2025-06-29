# Quick Start Guide

## ⚡ Get Started in 60 seconds

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start Development Server
```bash
pnpm dev
```

### 3. Open in Browser
Visit [http://localhost:3000](http://localhost:3000)

## 🧪 Verify Everything Works

### Run Tests
```bash
# Unit tests
pnpm vitest run

# E2E tests (in another terminal while dev server is running)
pnpm test:e2e
```

### Check Code Quality
```bash
# TypeScript
pnpm typecheck

# Linting
pnpm lint

# Build for production
pnpm build
```

## 🚀 Try Code Generation

### Generate a Component
```bash
pnpm plop:component
```

### Generate a Feature
```bash
pnpm plop:feature
```

## 🎯 What's Included

- ✅ React 19 + TypeScript 5.8+
- ✅ Vite 6+ for development
- ✅ Tailwind CSS 4 with dark/light themes
- ✅ Zustand + TanStack Query for state management
- ✅ Complete testing setup (Vitest + Playwright)
- ✅ Internationalization (i18n)
- ✅ Code generation with Plop.js
- ✅ ESLint + Prettier + Husky for code quality
- ✅ Scalable feature-based architecture

## 📁 Key Directories

```
src/
├── features/           # Feature modules (home, auth, etc.)
├── shared/             # Shared components and utilities
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── store/          # Global state (Zustand)
│   ├── i18n/           # Internationalization
│   └── utils/          # Utility functions
└── test/               # Test configuration
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm vitest run` | Run unit tests |
| `pnpm test:e2e` | Run E2E tests |
| `pnpm lint` | Lint code |
| `pnpm typecheck` | Check TypeScript |
| `pnpm plop` | Generate code |

## 🔧 Next Steps

1. **Customize the theme** in `src/index.css`
2. **Add your first feature** with `pnpm plop:feature`
3. **Update translations** in `src/shared/i18n/locales/`
4. **Configure environment variables** in `.env`

Happy coding! 🚀