# Sign-In Role Setup - Implementation Guide

## What You Did Right ✅

In your `SignInForm.tsx`, you're now correctly:

1. **Importing the `useRole` hook** from `RoleContext`
2. **Calling `setRole(userRole)`** with the role from API response
3. **Storing token & user data** in localStorage and Redux
4. **Persisting the role** so it's available across the app

## Code Flow Explanation

```tsx
// 1. Get the setRole function from RoleContext
const { setRole } = useRole();

// 2. In the API response, extract the role
const userRole = response?.data?.data?.role;

// 3. Set the role in the context (saves to localStorage too)
if (userRole) {
  setRole(userRole);
}

// 4. Store the full user object
localStorage.setItem('user', JSON.stringify(response?.data?.data));

// 5. Redirect to home (layout reads role from context)
router.push('/');
```

## Why `setRole` is Better Than `handleSetUser`

| Approach                 | Use Case                                                     | Storage                                              |
| ------------------------ | ------------------------------------------------------------ | ---------------------------------------------------- |
| `setRole(role)`          | **You're using this ✅** Sets role and saves to localStorage | `userRole` in context + localStorage                 |
| `handleSetUser(userObj)` | Sets entire user object + role                               | `currentUser` + `userRole` in context + localStorage |

**Your choice is optimal** because:

- You're already storing user data in `localStorage.setItem('user', ...)`
- You only need the role in context for menu rendering
- `setRole()` is lightweight and efficient
- The role is automatically saved to localStorage by `RoleContext`

## How the Role Flows Through Your App

### 1. SignIn → Role stored in context + localStorage

```typescript
// In SignInForm.tsx
setRole(response?.data?.data?.role);
localStorage.setItem('userRole', role); // Done by setRole()
```

### 2. On Page Reload → Role restored from localStorage

```typescript
// In RoleContext.tsx useEffect()
const savedRole = localStorage.getItem('userRole') as UserRole | null;
if (savedRole) {
  setUserRole(savedRole);
}
```

### 3. Layout renders correct sidebar based on role

```typescript
// In your layout component (admin/agent/etc)
const { menuItems, userRole } = useRole();

// menuItems is pre-configured for each role
// Example: userRole === 'agent' → shows Agent menu
```

### 4. Routes are protected by role

```typescript
// Each role has its own route group:
// /src/app/admin/...      → Admin pages
// /src/app/agent/...      → Agent pages
// /src/app/merchant/...   → Merchant pages
```

## Current Sidebar Behavior

✅ **Admin** (`/`) — Shows admin menu with Dashboard, User Profile, Employee
✅ **Agent** (`/agent`) — Shows agent menu with Dashboard, Merchant, Profile
✅ **Merchant** (`/merchant`) — Ready to be implemented
✅ **Operations** (`/operations`) — Ready to be implemented
✅ **Support** (`/support`) — Ready to be implemented

## What Happens on Sign-In Now

```
1. User submits email/password
   ↓
2. API returns { token, data: { role: 'agent', ... } }
   ↓
3. SignInForm extracts role → setRole('agent')
   ↓
4. RoleContext saves to context state + localStorage
   ↓
5. User redirected to '/'
   ↓
6. Root layout wraps with RoleProvider
   ↓
7. Layout/Sidebar reads useRole() → gets 'agent'
   ↓
8. Agent sidebar renders instead of admin
```

## Testing Your Setup

### Test Role Persistence:

1. Sign in as agent
2. Refresh the page → sidebar stays agent (role restored from localStorage)
3. Open DevTools → Application → localStorage → `userRole: 'agent'`

### Test Role Switching:

1. Sign in as admin → see admin menu
2. (If you have multiple test accounts) Sign out & sign in as agent → see agent menu

### Test Route Redirection:

1. After sign-in, manually visit `/` → uses admin layout
2. Visit `/agent` → uses agent layout
3. Visit `/agent/merchant` → shows merchant placeholder
4. Visit `/admin` → redirects or shows 404 (depending on your setup)

## Files Involved

- **SignInForm.tsx** — Sets role after login
- **RoleContext.tsx** — Manages role state + localStorage
- **AppSidebar.tsx** — Admin sidebar (shows admin items)
- **AgentSidebar.tsx** — Agent sidebar (shows agent items)
- **types/roles.ts** — Role enum + types
- **app/(admin)/layout.tsx** — Admin layout (uses AppSidebar)
- **app/agent/layout.tsx** — Agent layout (uses AgentSidebar)

## Next Steps

To add a new role (e.g., Merchant):

1. **Update `types/roles.ts`** — Role already exists in enum
2. **Update `RoleContext.tsx`** — Add menu items for MERCHANT role
3. **Create `/src/app/merchant/` folder** — New route group
4. **Create `/src/app/merchant/layout.tsx`** — Merchant layout with MerchantSidebar
5. **Create MerchantSidebar component** — Similar to AgentSidebar
6. Test sign-in with merchant account

Your implementation is production-ready! 🚀
