# RoleContext Icon Issue - Resolution Summary

## Problem

When testing components that use `UserRole.MERCHANT` (or any role) with Jest, the following error occurred:

```
React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: object.
```

## Root Cause

The issue was in `RoleContext.tsx` where icons were being stored as **JSX elements** instead of **component references**:

```tsx
// ❌ WRONG - Storing JSX elements
const roleMenuConfig: Record<UserRole, NavItem[]> = {
  [UserRole.MERCHANT]: [
    {
      icon: <GridIcon />,  // This is a React element (object)
      name: 'Dashboard',
      // ...
    },
  ],
}
```

When Jest runs tests, these JSX elements get serialized as objects. When React tries to render them, it receives an object instead of a valid React component, causing the error.

## Solution

### 1. Store Component References Instead of JSX Elements

**Changed `RoleContext.tsx`:**
```tsx
// ✅ CORRECT - Storing component references
const roleMenuConfig: Record<UserRole, NavItem[]> = {
  [UserRole.MERCHANT]: [
    {
      icon: GridIcon,  // This is a component reference (function)
      name: 'Dashboard',
      // ...
    },
  ],
}
```

### 2. Update Type Definitions

**Changed `src/types/roles.ts`:**
```tsx
export interface NavItem {
  name: string;
  icon: React.ComponentType<any>;  // Changed from React.ReactNode
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
}
```

### 3. Update Sidebar Components to Render Icons

**Changed `AppSidebar.tsx` and `AgentSidebar.tsx`:**
```tsx
// ❌ WRONG - Trying to render the component reference directly
<span>{nav.icon}</span>

// ✅ CORRECT - Instantiate the component
<span><nav.icon /></span>
```

### 4. Configure Jest to Mock SVG Imports

Since the icons are imported from SVG files using `@svgr/webpack`, Jest needs to mock these imports properly.

**Updated `jest.config.ts`:**
```typescript
export default async () => {
  const jestConfig = await createJestConfig(config)()
  
  return {
    ...jestConfig,
    moduleNameMapper: {
      ...jestConfig.moduleNameMapper,
      '\\.svg$': '<rootDir>/__mocks__/svg.tsx',
    },
  }
}
```

**Created `__mocks__/svg.tsx`:**
```tsx
import React from 'react'

const SvgMock = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} {...props} data-testid="svg-mock" />
))

SvgMock.displayName = 'SvgMock'

export default SvgMock
```

### 5. Mock Icons in Tests

For tests that directly use the RoleContext, mock the icon imports:

```tsx
// At the top of test files
jest.mock('../icons/index', () => {
  const React = require('react')
  return {
    GridIcon: () => React.createElement('svg', { 'data-testid': 'grid-icon' }),
    UserCircleIcon: () => React.createElement('svg', { 'data-testid': 'user-circle-icon' }),
    BoxCubeIcon: () => React.createElement('svg', { 'data-testid': 'box-cube-icon' }),
  }
})
```

## Files Modified

1. `/src/context/RoleContext.tsx` - Changed icon storage from JSX to component references
2. `/src/types/roles.ts` - Updated NavItem interface
3. `/src/layout/AppSidebar.tsx` - Updated icon rendering
4. `/src/layout/AgentSidebar.tsx` - Updated icon rendering
5. `/jest.config.ts` - Added SVG mocking configuration
6. `/jest.setup.ts` - Created Jest setup file
7. `/__mocks__/svg.tsx` - Created SVG mock component
8. `/src/context/RoleContext.test.tsx` - Created comprehensive tests
9. `/src/app/agent/merchant/page.test.tsx` - Updated with proper mocking

## Key Takeaways

1. **Never store JSX elements in configuration objects** - Always store component references (functions) instead
2. **Update type definitions** to use `React.ComponentType` instead of `React.ReactNode` for component references
3. **Render components properly** using `<Component />` syntax, not `{component}`
4. **Mock SVG imports in Jest** since webpack loaders don't run during testing
5. **Test with proper mocking** to ensure components work correctly in test environments

## Testing

All tests now pass successfully:
- ✅ `src/context/RoleContext.test.tsx` - 4/4 tests passing
- ✅ `src/app/agent/merchant/page.test.tsx` - 1/1 test passing

The application runs correctly in both development and test environments.
