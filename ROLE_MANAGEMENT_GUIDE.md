# Multi-Role User Management Setup Guide

## Overview

This guide explains the role-based access control system implemented in your Next.js project. Currently set up for: **Admin**, **Agent**, **Operations**, **Support**, and **Merchant** roles.

---

## File Structure

```
src/
├── types/
│   └── roles.ts                    # Role enums and types
├── context/
│   ├── RoleContext.tsx             # Role management context
│   └── SidebarContext.tsx          # Sidebar state (existing)
├── layout/
│   ├── AppSidebar.tsx              # Admin sidebar (existing)
│   └── AgentSidebar.tsx            # Agent sidebar (NEW)
└── app/
    ├── layout.tsx                  # Root layout with RoleProvider
    ├── (admin)/
    │   ├── layout.tsx              # Admin layout
    │   ├── (others-pages)/
    │   └── (ui-elements)/
    └── (agent)/                    # NEW - Agent role routes
        ├── layout.tsx              # Agent layout
        └── (agent-pages)/
            ├── page.tsx            # Agent dashboard
            ├── merchant/
            │   └── page.tsx        # Merchant management (YOUR FORM HERE)
            └── profile/
                └── page.tsx        # Agent profile
```

---

## How It Works

### 1. **Role Context** (`RoleContext.tsx`)

- Manages current user role
- Provides role-specific menu items
- Stores role in localStorage for persistence
- Supports 5 roles: `ADMIN`, `AGENT`, `OPERATIONS`, `SUPPORT`, `MERCHANT`

**Usage:**

```tsx
import { useRole } from '@/context/RoleContext';

export default function MyComponent() {
  const { userRole, menuItems, setRole } = useRole();

  return (
    <div>
      Current Role: {userRole}
      {/* menuItems automatically updates based on role */}
    </div>
  );
}
```

### 2. **Agent Sidebar** (`AgentSidebar.tsx`)

- Automatically displays menu items from RoleContext
- Uses the same styling/behavior as admin sidebar
- Shows: Dashboard, Merchant, and Profile

### 3. **Agent Layout** (`app/(agent)/layout.tsx`)

- Uses AgentSidebar instead of AppSidebar
- Same header and backdrop as admin
- All agent routes fall under this layout

---

## Switching Between Roles

### Method 1: Using setRole Hook

```tsx
import { useRole } from '@/context/RoleContext';

export default function RoleSwitcher() {
  const { setRole } = useRole();

  return (
    <select onChange={(e) => setRole(e.target.value as UserRole)}>
      <option value="admin">Admin</option>
      <option value="agent">Agent</option>
      <option value="operations">Operations</option>
      <option value="support">Support</option>
      <option value="merchant">Merchant</option>
    </select>
  );
}
```

### Method 2: After Login (Recommended)

```tsx
// In your sign-in component or auth service
import { useRole } from '@/context/RoleContext';

async function handleLogin(email: string, password: string) {
  const user = await loginUser(email, password);

  const { setUser } = useRole();
  setUser({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role, // Must be UserRole enum value
  });

  // Navigate to appropriate dashboard
  router.push(`/admin` || `/agent` || `/operations` || `/support` || `/merchant`);
}
```

---

## Adding New Roles

### Step 1: Update `types/roles.ts`

```tsx
export enum UserRole {
  ADMIN = 'admin',
  AGENT = 'agent',
  OPERATIONS = 'operations',
  SUPPORT = 'support',
  MERCHANT = 'merchant',
  // ADD NEW ROLE HERE
  MANAGER = 'manager',
}
```

### Step 2: Add role routes

```tsx
export const roleRoutes = {
  [UserRole.ADMIN]: '/admin',
  [UserRole.AGENT]: '/agent',
  [UserRole.OPERATIONS]: '/operations',
  [UserRole.SUPPORT]: '/support',
  [UserRole.MERCHANT]: '/merchant',
  [UserRole.MANAGER]: '/manager', // NEW
} as const;
```

### Step 3: Define menu items in `RoleContext.tsx`

```tsx
const roleMenuConfig: Record<UserRole, NavItem[]> = {
  // ... existing roles
  [UserRole.MANAGER]: [
    {
      icon: <GridIcon />,
      name: 'Dashboard',
      subItems: [{ name: 'Overview', path: '/manager', pro: false }],
    },
    // Add more menu items
  ],
};
```

### Step 4: Create layout and pages

```
src/app/(manager)/
├── layout.tsx
└── (manager-pages)/
    └── page.tsx
```

---

## Customizing the Merchant Page

The merchant page is located at: `src/app/(agent)/(agent-pages)/merchant/page.tsx`

### Current Structure

- Add form section
- List section (placeholder)

### To Add Your Own Form:

```tsx
// src/app/(agent)/(agent-pages)/merchant/page.tsx
import MerchantForm from '@/components/merchant/MerchantForm';
import MerchantList from '@/components/merchant/MerchantList';

export default function MerchantPage() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 md:col-span-6">
        <MerchantForm />
      </div>
      <div className="col-span-12 md:col-span-6">
        <MerchantList />
      </div>
    </div>
  );
}
```

### Example: MerchantForm Component

```tsx
// src/components/merchant/MerchantForm.tsx
'use client';
import { useState } from 'react';
import Label from '@/components/form/Label';
import Input from '@/components/form/input/InputField';

export default function MerchantForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your API call here
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Merchant Name</Label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter merchant name"
        />
      </div>
      <div>
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
      </div>
      <button
        type="submit"
        className="bg-brand-500 hover:bg-brand-600 rounded-lg px-4 py-2 text-white"
      >
        Save
      </button>
    </form>
  );
}
```

---

## Menu Item Configuration

Menu items are defined in `RoleContext.tsx`:

```tsx
interface NavItem {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: {
    name: string;
    path: string;
    pro?: boolean;
    new?: boolean;
  }[];
}
```

### Example: Adding a menu item

```tsx
[UserRole.AGENT]: [
  {
    icon: <GridIcon />,
    name: 'Dashboard',
    subItems: [{ name: 'Overview', path: '/agent', pro: false }],
  },
  {
    icon: <BoxCubeIcon />,
    name: 'Merchant',
    path: '/agent/merchant', // Single menu item
  },
  {
    icon: <UserCircleIcon />,
    name: 'Reports', // Menu with sub-items
    subItems: [
      { name: 'Daily Report', path: '/agent/reports/daily', new: true },
      { name: 'Monthly Report', path: '/agent/reports/monthly', pro: true },
    ],
  },
]
```

---

## Testing the Setup

### 1. Start your app

```bash
npm run dev
```

### 2. Test Agent Role

Navigate to: `http://localhost:3000/agent`

### 3. Switch Roles (Add this temporarily to test)

Create a component in `src/app/role-switcher.tsx`:

```tsx
'use client';
import { useRole } from '@/context/RoleContext';
import { UserRole } from '@/types/roles';

export default function RoleSwitcher() {
  const { setRole } = useRole();

  return (
    <div className="fixed right-4 bottom-4 rounded-lg bg-white p-4 shadow-lg">
      <p className="mb-2 font-bold">Switch Role:</p>
      {Object.values(UserRole).map((role) => (
        <button
          key={role}
          onClick={() => setRole(role)}
          className="block w-full rounded px-3 py-2 text-left hover:bg-gray-100"
        >
          {role}
        </button>
      ))}
    </div>
  );
}
```

Add to `src/app/(admin)/layout.tsx`:

```tsx
import RoleSwitcher from '@/app/role-switcher';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <RoleSwitcher />
      {/* existing content */}
    </div>
  );
}
```

---

## Key Features

✅ **Role-based routing** - Each role has its own route prefix  
✅ **Dynamic sidebars** - Sidebar changes based on role  
✅ **Persistent roles** - Role saved in localStorage  
✅ **Easy to extend** - Add new roles without touching existing code  
✅ **Consistent styling** - All sidebars use the same theme  
✅ **TypeScript support** - Full type safety

---

## Next Steps

1. **Customize Merchant Form** - Replace placeholder with your actual form
2. **Add authentication** - Integrate with your auth service
3. **Add other roles** - Follow the pattern for Operations, Support, Merchant
4. **Add role protection** - Implement middleware to protect routes
5. **API integration** - Connect forms to your backend

---

## Troubleshooting

### Sidebar not showing menu

- Check that `RoleProvider` is in root layout
- Verify role is set correctly in RoleContext

### Role not persisting

- Check browser localStorage
- Verify `UserRole` values match exactly

### Layout not applying

- Ensure layout.tsx is in correct folder structure
- Check that pages are under `(agent-pages)` folder

---

## Support

For questions about specific components, check:

- `src/layout/AppSidebar.tsx` - Reference implementation
- `src/context/SidebarContext.tsx` - Sidebar state management
- `src/app/(admin)/layout.tsx` - Admin layout pattern
