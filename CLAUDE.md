# Crypto Currency Application - Development Guidelines

## Overview

This is a React Native/Expo application built with TypeScript focusing on cryptocurrency and fiat currency data management. **Performance is EXTREMELY critical** - all components must be optimized for maximum efficiency.

## Core Technologies

- **React Native/Expo**: Cross-platform mobile development
- **TypeScript**: Strict typing for all code
- **Zustand**: Global state management with AsyncStorage persistence
- **@legendapp/list**: High-performance list rendering (mandatory for all lists)
- **React Query**: Data fetching and caching
- **Detox**: End-to-end testing framework
- **Jest**: Unit tests

## TypeScript Standards

### Component Patterns

**MANDATORY**: Use `React.FC<Props>` pattern for all functional components:

```typescript
type Props = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

const SearchComponent: React.FC<Props> = ({ searchQuery, onSearchChange }) => {
  // Component implementation
};
```

### Type Definitions

- **ALWAYS** use `type` over `interface` for prop definitions
- Define props as `type Props = { ... }` convention
- Use strict TypeScript configuration - no `any` types allowed
- Import types explicitly: `import type { ComponentType } from 'react'`

## Performance Requirements (EXTREMELY CRITICAL)

### Mandatory Optimizations

All components MUST implement these performance patterns:

#### 1. React.memo for Pure Components

```typescript
const CurrencyItem: React.FC<Props> = React.memo(({ currency, onPress }) => {
  // Component logic
});
```

OR
```typescript
const CurrencyItem: React.FC<Props> = (({ currency, onPress }) => {
  // Component logic
});

export default React.memo(CurrencyItem);
```

#### 2. useCallback for Event Handlers

```typescript
const handleSearch = useCallback((query: string) => {
  setSearchQuery(query);
}, []);
```

#### 3. useMemo for Expensive Computations

```typescript
const filteredCurrencies = useMemo(() => {
  return currencies.filter(currency => 
    currency.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [currencies, searchQuery]);
```

#### 4. @legendapp/list for All Lists

**MANDATORY**: Use `@legendapp/list` instead of FlatList or ScrollView for any list rendering:

```typescript
import { List } from '@legendapp/list';

const CurrencyList: React.FC<Props> = ({ currencies }) => {
  return (
    <List
      data={currencies}
      renderItem={({ item }) => <CurrencyItem currency={item} />}
      estimatedItemSize={60}
    />
  );
};
```

## State Management

### Zustand Store Pattern

```typescript
interface StoreState {
  data: DataType[];
  loading: boolean;
  error: string | null;
  setData: (data: DataType[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      data: [],
      loading: false,
      error: null,
      setData: (data) => set({ data, error: null }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'store-name',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ data: state.data }),
    }
  )
);
```

### Custom Hooks

Create performance-optimized custom hooks:

```typescript
const useOptimizedData = (searchQuery?: string) => {
  const { data, loading, error } = useStore();
  
  const filteredData = useMemo(() => {
    if (!searchQuery?.trim()) return data;
    return data.filter(/* filtering logic */);
  }, [data, searchQuery]);

  return useMemo(() => ({
    data: filteredData,
    loading,
    error,
    totalCount: data.length,
  }), [filteredData, loading, error, data.length]);
};
```

## Project Structure

```
├── app/                    # Expo Router screens
├── components/            # Reusable UI components  
├── hooks/                # Custom React hooks
├── store/                # Zustand stores
├── constants/            # Static data and configurations
├── @types/               # TypeScript type definitions
└── e2e/                  # Detox test files
```

## Testing

### Detox E2E Tests

- Configure for both iOS and Android
- Use debug mode for development testing
- Bundle JavaScript for CI/CD environments
- Test critical user flows and data manipulation

### Component Testing

- Use React Native Testing Library
- Test component behavior, not implementation
- Mock external dependencies and API calls

## Development Guidelines

1. **Performance First**: Every component must be performance-optimized
2. **Type Safety**: Strict TypeScript - no runtime type errors allowed  
3. **Memoization**: Use React.memo, useCallback, useMemo extensively
4. **List Rendering**: Always use @legendapp/list for better performance
5. **State Management**: Zustand with AsyncStorage persistence
6. **Testing**: Comprehensive E2E and unit test coverage
7. **Code Quality**: ESLint, Prettier, and pre-commit hooks

## Key Performance Metrics

- List scrolling must maintain 60fps
- State persistence should not block UI
- Memory usage must remain stable during extended use
