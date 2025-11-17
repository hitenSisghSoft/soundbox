# Quick Start: Role-Based Multi-User System

## 🎯 What Was Created

### 1. **Role Types** (`src/types/roles.ts`)

- `UserRole` enum with 5 roles: admin, agent, operations, support, merchant
- TypeScript interfaces for type safety

### 2. **Role Context** (`src/context/RoleContext.tsx`)

- Manages user roles across the app
- Provides role-specific menu items
- Persists role in localStorage

### 3. **Agent Sidebar** (`src/layout/AgentSidebar.tsx`)

- Displays agent-specific menu items
- Automatically updates based on current role

### 4. **Agent Layout** (`src/app/(agent)/layout.tsx`)

- Complete agent dashboard layout
- Same structure as admin layout

### 5. **Agent Pages**

- Dashboard: `src/app/(agent)/(agent-pages)/page.tsx`
- Merchant: `src/app/(agent)/(agent-pages)/merchant/page.tsx` ← **Add your form here**
- Profile: `src/app/(agent)/(agent-pages)/profile/page.tsx`

### 6. **Role Provider Integration** (`src/app/layout.tsx`)

- Root layout now includes RoleProvider
- Available to all components in your app

---

## 🚀 Quick Usage

### Access Current Role

```tsx
import { useRole } from '@/context/RoleContext';

export default function MyComponent() {
  const { userRole, menuItems } = useRole();

  return <div>{userRole}</div>;
}
```

### Switch Role (for testing)

```tsx
const { setRole } = useRole();
setRole('agent'); // Switches to agent role
```

### Set User After Login

```tsx
const { setUser } = useRole();

setUser({
  id: '123',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'agent',
});
```

---

## 📍 Navigate to Pages

| Role       | Route             | Description                             |
| ---------- | ----------------- | --------------------------------------- |
| Admin      | `/`               | Admin dashboard                         |
| Agent      | `/agent`          | Agent dashboard                         |
| Agent      | `/agent/merchant` | **Your merchant form goes here**        |
| Agent      | `/agent/profile`  | Agent profile                           |
| Operations | `/operations`     | Operations dashboard (create as needed) |
| Support    | `/support`        | Support dashboard (create as needed)    |
| Merchant   | `/merchant`       | Merchant dashboard (create as needed)   |

---

## 📝 Add Your Merchant Form

**File:** `src/app/(agent)/(agent-pages)/merchant/page.tsx`

Replace the placeholder content with your form:

```tsx
import MerchantForm from '@/components/merchant/MerchantForm';

export default function MerchantPage() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12">
        <MerchantForm />
      </div>
    </div>
  );
}
```

Then create your form component at `src/components/merchant/MerchantForm.tsx`

---

## 🔧 Add a New Role (e.g., Operations)

### Step 1: Update `src/types/roles.ts`

```tsx
export enum UserRole {
  // ... existing roles
  OPERATIONS = 'operations',
}

export const roleRoutes = {
  // ... existing routes
  [UserRole.OPERATIONS]: '/operations',
};
```

### Step 2: Add menu in `src/context/RoleContext.tsx`

```tsx
[UserRole.OPERATIONS]: [
  {
    icon: <GridIcon />,
    name: 'Dashboard',
    subItems: [{ name: 'Overview', path: '/operations', pro: false }],
  },
  // Add more menu items
],
```

### Step 3: Create layout & pages

```
src/app/(operations)/
├── layout.tsx
└── (operations-pages)/
    └── page.tsx
```

---

## 🎨 Customize Sidebar Menu

Edit `src/context/RoleContext.tsx`:

```tsx
const roleMenuConfig: Record<UserRole, NavItem[]> = {
  [UserRole.AGENT]: [
    {
      icon: <GridIcon />,
      name: 'Dashboard',
      subItems: [{ name: 'Overview', path: '/agent', pro: false }],
    },
    {
      icon: <BoxCubeIcon />,
      name: 'Merchant',
      path: '/agent/merchant',
    },
    {
      icon: <UserCircleIcon />,
      name: 'Profile',
      path: '/agent/profile',
    },
    // Add more items here
  ],
};
```

---

## 💾 Role Persistence

- Roles are automatically saved to localStorage
- Persists across browser sessions
- Retrieved on app startup

---

## 🧪 Testing the Setup

### Visit Agent Dashboard

```
http://localhost:3000/agent
```

You should see:

- Agent-specific sidebar
- Agent dashboard with stats
- Links to Merchant and Profile pages

### Access Merchant Page

```
http://localhost:3000/agent/merchant
```

This is where you'll add your merchant form and list

---

## 📚 Documentation

Full guide: `ROLE_MANAGEMENT_GUIDE.md` in project root

---

## ✅ What Works Now

- ✅ Role-based routing
- ✅ Role-specific sidebars
- ✅ Dynamic menu items
- ✅ Role persistence
- ✅ Easy to extend

## 🔜 What You Need to Do

- [ ] Add your merchant form component
- [ ] Integrate with your auth/login system
- [ ] Create pages for other roles (Operations, Support, Merchant)
- [ ] Connect forms to backend API
- [ ] Add route protection (optional)

---

## 🐛 Troubleshooting

**Sidebar not showing?**

- Check RoleProvider is in root layout ✅ (already done)
- Clear browser cache and reload

**Role not changing?**

- Check localStorage for 'userRole' key
- Verify UserRole enum value matches exactly

**Pages not loading?**

- Check folder structure matches the pattern
- Verify page.tsx exists in the route

**Need help?** Check `ROLE_MANAGEMENT_GUIDE.md` for detailed explanations
