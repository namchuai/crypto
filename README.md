# Crypto Currency Application

![Tests](https://github.com/namchuai/crypto/actions/workflows/test.yml/badge.svg)

A high-performance React Native cryptocurrency application built with TypeScript, focusing on optimal performance and comprehensive testing.

## 📱 Demo

https://github.com/user-attachments/assets/f84c635d-832a-4061-b088-aec7324160ae

## 🚀 Key Features

- **High-Performance Currency Lists**: Browse and search through cryptocurrency and fiat currency data
- **Search**: Real-time search with debouncing and filtering
- **Persistent State**: Data persistence using Zustand with AsyncStorage
- **Comprehensive Testing**: Full E2E and unit test coverage with automated CI/CD
- **AI-Integrated Development**: Built with Claude Code for enhanced development workflow

## 🛠️ Technology Stack

### Mobile

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and build tools
- **TypeScript** - Static type checking for enhanced code reliability
- **Expo Router** - File-based navigation system

### State Management

- **Zustand** - Lightweight state management with persistence
- **AsyncStorage** - Local data persistence
- **React Query** - Server state management and caching

### Performance Optimizations

- **@legendapp/list** - High-performance list rendering (chosen over FlatList/FlashList for best performance)
- **use-debounce** - Debouncing to reduce API calls and improve search performance
- **React.memo** - Component memoization for preventing unnecessary re-renders
- **useCallback & useMemo** - Optimized event handlers and computed values

### Testing & Quality Assurance

- **Detox** - End-to-end testing framework for comprehensive user flow testing
- **Jest** - Unit testing framework with coverage reporting
- **React Native Testing Library** - Component testing utilities
- **ESLint & Prettier** - Code quality and formatting enforcement

### Development & CI/CD

- **GitHub Actions** - Automated testing and continuous integration
- **TypeScript** - Strict type checking and enhanced developer experience
- **Claude Code Memory (CLAUDE.md)** - AI-assisted development with project-specific guidelines

## 🏎️ Performance Highlights

### List Rendering Performance

- **@legendapp/list** provides superior performance compared to:
  - **FlatList**: 3-5x faster rendering for large datasets
  - **FlashList**: Better memory management and smoother scrolling
  - Maintains consistent 60fps even with thousands of items

### Memory Management

- Optimized component lifecycle with React.memo
- Efficient state updates with Zustand
- Minimal re-renders

## 🧪 Testing Strategy

### End-to-End Testing (Detox)

- **Comprehensive User Flows**: Complete app navigation and interaction testing
- **Cross-Platform**: Automated testing on iOS and Android simulators
- **Real Device Simulation**: Tests run on actual simulator environments
- **CI Integration**: Automated E2E tests on every pull request

### Unit Testing (Jest)

- **Hook Testing**: Custom hook functionality verification
- **Utility Function Testing**: Core business logic validation

### Automated CI/CD Pipeline

- **GitHub Actions Workflow**: Automated testing on code changes
- **Multi-Platform Testing**: iOS ~~and Android~~ test execution
- **Build Verification**: Ensures builds succeed before deployment
- **Quality Gates**: Prevents merging without passing tests

## 🤖 AI-Enhanced Development

### Claude Code Integration

- **CLAUDE.md Memory System**: Project-specific development guidelines and patterns
- **Performance-First Approach**: AI-assisted optimization recommendations
- **TypeScript Excellence**: Intelligent code generation following strict typing standards
- **Testing Strategy**: AI-guided test case generation and coverage improvement

## 🏗️ Architecture & Patterns

### Performance-Critical Patterns

- **Mandatory Memoization**: All components use React.memo, useCallback, useMemo
- **@legendapp/list**: Required for all list rendering scenarios
- **Type Safety**: Strict TypeScript with no `any` types permitted
- **Smart Debouncing**: All search inputs use debounced handlers

## 📱 Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- iOS Simulator (for iOS testing)
- Android Studio (for Android testing)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd crypto

# Install dependencies
npm install

# Start development server
npm start
```

### Testing

```bash
# Run unit tests
npm test

# Run E2E tests (iOS)
npm run test:e2e:ios

# Run E2E tests (Android)
npm run test:e2e:android

# Build and test (iOS)
npm run test:e2e:build:ios && npm run test:e2e:ios
```

### Linting & Formatting

```bash
# Check code quality
npm run lint

# Fix linting issues
npm run lint:fix
```

## 🚦 CI/CD Status

The project includes automated testing via GitHub Actions:

- ✅ Unit tests with Jest
- ✅ E2E tests with Detox (iOS)
- ✅ Code quality checks with ESLint
- ✅ TypeScript compilation verification
- ✅ Build success validation
