# Architecture Diagram

## User Role Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     ROOT LAYOUT                             │
│  Contains: RoleProvider, ThemeProvider, SidebarProvider    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ useRole()
                     ▼
        ┌────────────────────────────┐
        │   RoleContext              │
        │ - Current Role             │
        │ - Menu Items               │
        │ - Current User             │
        └────────────────────────────┘
                     │
            ┌────────┼────────┬─────────┬─────────┐
            │        │        │         │         │
            ▼        ▼        ▼         ▼         ▼
        ┌─────┐ ┌───────┐ ┌──────┐ ┌────────┐ ┌─────────┐
        │Admin│ │Agent  │ │Ops   │ │Support │ │Merchant │
        └─────┘ └───────┘ └──────┘ └────────┘ └─────────┘
            │        │
            ▼        ▼
      ┌──────────┐ ┌──────────────┐
      │AppSidebar│ │AgentSidebar  │
      └──────────┘ └──────────────┘
            │             │
            ▼             ▼
        ┌──────┐    ┌─────────────┐
        │ /    │    │  /agent     │
        │ /    │    │  /agent/*   │
        │ /... │    │             │
        └──────┘    └─────────────┘
```

---

## Route Structure

```
/                                (Root - Auth/Public Pages)
│
├── (admin)                       Admin Role Routes
│   ├── layout.tsx
│   ├── page.tsx
│   ├── (others-pages)/
│   └── (ui-elements)/
│
├── (agent)                       Agent Role Routes [NEW]
│   ├── layout.tsx
│   └── (agent-pages)/
│       ├── page.tsx              Dashboard
│       ├── merchant/
│       │   └── page.tsx          ← Your Merchant Form Here
│       └── profile/
│           └── page.tsx          Agent Profile
│
├── (operations)                  Operations Role Routes [READY]
│   ├── layout.tsx
│   └── (operations-pages)/
│       └── page.tsx
│
├── (support)                     Support Role Routes [READY]
│   ├── layout.tsx
│   └── (support-pages)/
│       └── page.tsx
│
└── (merchant)                    Merchant Role Routes [READY]
    ├── layout.tsx
    └── (merchant-pages)/
        └── page.tsx
```

---

## Component Hierarchy

```
RootLayout
└── Provider (Redux)
    └── PersistGate
        └── CustomAlertContextProvider
            └── RoleProvider
                └── ThemeProvider
                    └── SidebarProvider
                        └── Children
                            │
                            ├── (admin) Layout
                            │   ├── AppSidebar
                            │   ├── AppHeader
                            │   └── Page Content
                            │
                            ├── (agent) Layout [NEW]
                            │   ├── AgentSidebar
                            │   ├── AppHeader
                            │   └── Page Content
                            │
                            └── (others) Layout
                                ├── Sidebar
                                ├── Header
                                └── Content
```

---

## Data Flow: User Login

```
┌─────────────────────────────────────────────────────────────┐
│ 1. User Submits Login Form                                  │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. API Call: loginUser(email, password)                     │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. API Response: { user, token, role }                      │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. Call setUser() from useRole()                            │
│    setUser({                                                 │
│      id: user.id,                                           │
│      name: user.name,                                       │
│      email: user.email,                                     │
│      role: user.role  // 'agent', 'admin', etc.             │
│    })                                                        │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. RoleContext Updates:                                     │
│    - currentUser = user                                     │
│    - userRole = user.role                                   │
│    - menuItems = roleMenuConfig[user.role]                  │
│    - Save to localStorage                                   │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. All Components Using useRole() Re-render:                │
│    - Sidebar updates menu items                             │
│    - Header updates user info                               │
│    - Protected routes can check role                        │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ 7. Navigate to Role Dashboard                               │
│    router.push(`/${user.role}`)                             │
│    e.g., /agent, /admin, /operations                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Menu Item Flow: Agent Role

```
┌────────────────────────────────────────────────────────────┐
│ RoleContext.tsx                                            │
│ roleMenuConfig[UserRole.AGENT] = [                         │
│   {                                                         │
│     icon: <GridIcon />,                                    │
│     name: "Dashboard",                                     │
│     subItems: [                                            │
│       { name: "Overview", path: "/agent", pro: false }    │
│     ]                                                       │
│   },                                                        │
│   {                                                         │
│     icon: <BoxCubeIcon />,                                 │
│     name: "Merchant",                                      │
│     path: "/agent/merchant"                                │
│   },                                                        │
│   {                                                         │
│     icon: <UserCircleIcon />,                              │
│     name: "Profile",                                       │
│     path: "/agent/profile"                                 │
│   }                                                         │
│ ]                                                           │
└────────────────────────────────────────────────────────────┘
                          ▼
┌────────────────────────────────────────────────────────────┐
│ AgentSidebar.tsx                                           │
│ const { menuItems } = useRole();                           │
│                                                             │
│ menuItems = roleMenuConfig[UserRole.AGENT]                │
│                                                             │
│ Render each item as menu link                             │
└────────────────────────────────────────────────────────────┘
                          ▼
┌────────────────────────────────────────────────────────────┐
│ Displayed Sidebar:                                         │
│ ┌──────────────────────────────┐                           │
│ │ ▶ Dashboard                  │                           │
│ │   └─ Overview                │                           │
│ │ ▶ Merchant                   │  ← Your form location     │
│ │ ▶ Profile                    │                           │
│ └──────────────────────────────┘                           │
└────────────────────────────────────────────────────────────┘
```

---

## Merchant Form Location

```
/agent/merchant
    │
    ├── Layout: src/app/(agent)/layout.tsx
    │   └── Uses: AgentSidebar + AppHeader
    │
    └── Page: src/app/(agent)/(agent-pages)/merchant/page.tsx
        │
        ├── Import: MerchantForm component
        │   └── File: src/components/merchant/MerchantForm.tsx [NEEDS TO BE CREATED]
        │
        ├── Form Fields:
        │   ├── Merchant Name
        │   ├── Email
        │   ├── Phone
        │   └── ... (your fields)
        │
        └── Submit Handler:
            └── POST /api/merchants
                └── Save to database
```

---

## State Management Overview

```
LocalStorage
└── userRole: 'admin' | 'agent' | 'operations' | 'support' | 'merchant'

RoleContext State
├── currentUser: UserWithRole
│   ├── id: string
│   ├── name: string
│   ├── email: string
│   └── role: UserRole
│
├── userRole: UserRole (current user's role)
│
└── menuItems: NavItem[]
   └── Generated from roleMenuConfig[userRole]

SidebarContext State (existing)
├── isExpanded: boolean
├── isMobileOpen: boolean
├── isHovered: boolean
├── activeItem: string | null
└── openSubmenu: string | null
```

---

## Adding a New Role: Visual Workflow

```
1. Update src/types/roles.ts
   ├── Add to UserRole enum
   │   export enum UserRole {
   │     // ...
   │     MANAGER = 'manager',  ← NEW
   │   }
   │
   └── Add to roleRoutes
       export const roleRoutes = {
         // ...
         [UserRole.MANAGER]: '/manager',
       }

2. Update src/context/RoleContext.tsx
   └── Add to roleMenuConfig
       [UserRole.MANAGER]: [
         { icon, name, path/subItems },
         // ...
       ]

3. Create Layout: src/app/(manager)/layout.tsx
   └── Use same pattern as (agent) layout
       - Import AgentSidebar (or create ManagerSidebar)
       - Use AppHeader
       - Export default layout

4. Create Pages: src/app/(manager)/(manager-pages)/page.tsx
   └── Create dashboard page

Result: New role fully functional!
```

---

## Component Communication

```
┌──────────────────────────┐
│    SignInForm            │
│  (User logs in)          │
└────────────┬─────────────┘
             │
             │ setUser()
             ▼
┌──────────────────────────┐
│    RoleContext           │
│  (Stores role & user)    │
└────────────┬─────────────┘
             │
    ┌────────┴────────┐
    │ menuItems       │
    │ updated         │
    │                 │
    ▼                 ▼
┌─────────┐       ┌────────────┐
│Sidebar  │       │AppHeader   │
│updates  │       │updates     │
│menu     │       │user info   │
└─────────┘       └────────────┘
```

---

## File Dependencies

```
src/types/roles.ts
    ↓ imported by
src/context/RoleContext.tsx
    ↓ imported by
src/layout/AgentSidebar.tsx
src/app/layout.tsx
    ↓ imported by
src/app/(agent)/layout.tsx
    ↓ used by
src/app/(agent)/(agent-pages)/page.tsx
src/app/(agent)/(agent-pages)/merchant/page.tsx
src/app/(agent)/(agent-pages)/profile/page.tsx
```

---

## Deployment Checklist

```
✅ Role system created
✅ Agent sidebar created
✅ Agent layout created
✅ Agent pages created
✅ RoleProvider added to root layout
✅ Type safety ensured
✅ LocalStorage persistence working
✅ All files error-free

Next:
⭕ Add merchant form component
⭕ Integrate authentication
⭕ Connect to backend API
⭕ Add route protection (optional)
⭕ Test all roles
⭕ Deploy to production
```

---

This architecture is:

- **Scalable** - Add new roles easily
- **Type-Safe** - Full TypeScript support
- **Maintainable** - Clear separation of concerns
- **Extensible** - Easy to add features
- **Performant** - Minimal re-renders
