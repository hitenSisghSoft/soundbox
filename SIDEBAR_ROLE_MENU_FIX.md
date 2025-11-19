# Sidebar Role-Based Menu Fix

## What Was the Problem?

When you signed in as an **Agent**, you were still seeing the **Admin sidebar with "Employee"** instead of the **Agent sidebar with "Merchant"**.

### Root Cause

- `AppSidebar.tsx` had **hardcoded menu items**
- It was NOT reading from `RoleContext` like `AgentSidebar` does
- When an agent visited `/` (admin route), they saw the hardcoded admin menu with "Employee"

## What Was Changed?

### 1. Updated `RoleContext.tsx`

Changed the ADMIN menu to show **"Merchant"** instead of "Employee":

**Before:**

```tsx
[UserRole.ADMIN]: [
  { name: 'Dashboard', ... },
  { name: 'User Profile', path: '/profile' },
  { name: 'Employee', path: '/employee' },  // ❌ Old
]
```

**After:**

```tsx
[UserRole.ADMIN]: [
  { name: 'Dashboard', ... },
  { name: 'User Profile', path: '/profile' },
  { name: 'Merchant', path: '/merchant' },  // ✅ New
]
```

### 2. Updated `AppSidebar.tsx`

Made it **read from RoleContext** instead of hardcoded items:

**Before:**

```tsx
const navItems: NavItem[] = [
  { name: "Dashboard", ... },
  { name: "Employee", path: "/employee" },  // ❌ Hardcoded
];

const AppSidebar = () => {
  // Uses hardcoded navItems
}
```

**After:**

```tsx
const AppSidebar = () => {
  const { menuItems } = useRole(); // ✅ From RoleContext
  const navItems = menuItems;
  // Now uses role-based menu items
};
```

## How It Works Now

### When Admin User Signs In:

1. Sets role → `setRole('admin')`
2. Visits `/` (admin route)
3. Admin layout uses `AppSidebar`
4. `AppSidebar` reads `useRole()` → gets admin menu items
5. Shows: Dashboard, User Profile, **Merchant**

### When Agent User Signs In:

1. Sets role → `setRole('agent')`
2. Visits `/` (admin route)
3. Admin layout uses `AppSidebar`
4. `AppSidebar` reads `useRole()` → gets agent menu items
5. Shows: Dashboard, **Merchant**, Profile (agent menu)

### When Agent User Visits `/agent`:

1. Agent layout uses `AgentSidebar`
2. `AgentSidebar` also reads `useRole()`
3. Shows: Dashboard, **Merchant**, Profile (agent menu)

## Key Insight

**Both `AppSidebar` and `AgentSidebar` now read from the same source: `RoleContext`**

This means:

- ✅ Any user of any role will see the correct menu
- ✅ The sidebar automatically adapts to the logged-in role
- ✅ No hardcoded menu items
- ✅ Easy to add new roles

## Testing

After these changes, test:

1. **Sign in as Admin**
   - Navigate to `/` → Should see: Dashboard, User Profile, **Merchant**
2. **Sign in as Agent**
   - Navigate to `/` → Should see: Dashboard, **Merchant**, Profile
   - Navigate to `/agent` → Should see: Dashboard, **Merchant**, Profile
   - Click "Merchant" → Goes to `/agent/merchant`

3. **Role Persistence**
   - Sign in as Agent
   - Refresh page
   - Menu should still show Agent menu (role persisted from localStorage)

## Files Modified

| File                          | Change                                                     |
| ----------------------------- | ---------------------------------------------------------- |
| `src/context/RoleContext.tsx` | Changed ADMIN menu "Employee" → "Merchant"                 |
| `src/layout/AppSidebar.tsx`   | Made it read from `RoleContext` instead of hardcoded items |

## Sidebar Component Hierarchy

```
Root Layout
├── RoleProvider (stores role in context + localStorage)
│
├── Admin Layout
│   └── AppSidebar (now reads menuItems from RoleContext)
│
└── Agent Layout
    └── AgentSidebar (already reads menuItems from RoleContext)
```

Both sidebars now use the same dynamic menu configuration! 🎯
