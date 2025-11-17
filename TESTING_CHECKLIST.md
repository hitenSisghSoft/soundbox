# Testing & Verification Checklist

## ✅ Pre-Implementation Verification

- [x] Node.js and npm installed
- [x] Next.js 15.2.3 configured
- [x] TypeScript enabled
- [x] Tailwind CSS configured
- [x] Redux store configured
- [x] All dependencies installed

---

## ✅ Files Created

- [x] `src/types/roles.ts` - Role enums and types
- [x] `src/context/RoleContext.tsx` - Role management context
- [x] `src/layout/AgentSidebar.tsx` - Agent sidebar component
- [x] `src/app/(agent)/layout.tsx` - Agent layout wrapper
- [x] `src/app/(agent)/(agent-pages)/page.tsx` - Agent dashboard
- [x] `src/app/(agent)/(agent-pages)/merchant/page.tsx` - Merchant page
- [x] `src/app/(agent)/(agent-pages)/profile/page.tsx` - Agent profile
- [x] `src/app/layout.tsx` - Updated with RoleProvider
- [x] Documentation files (QUICK_START.md, ROLE_MANAGEMENT_GUIDE.md, etc.)

---

## 🧪 Testing Phase 1: Build & Compilation

### Run Tests:

```bash
npm run build
```

**Expected Result:** ✅ Build completes without errors

**Verification Points:**

- [ ] No TypeScript errors
- [ ] No import errors
- [ ] All components compile
- [ ] No missing dependencies

---

## 🧪 Testing Phase 2: Dev Server

### Run Development Server:

```bash
npm run dev
```

**Expected Result:** ✅ Server starts on http://localhost:3000

**Verification Points:**

- [ ] No console errors
- [ ] Server running
- [ ] Hot reload working
- [ ] Files can be edited and refresh

---

## 🧪 Testing Phase 3: Admin Dashboard (Existing)

### Test Admin Route:

Navigate to: **http://localhost:3000**

**Expected Results:**

- [ ] Admin dashboard loads
- [ ] Admin sidebar displays
- [ ] Menu items visible: Dashboard, User Profile, Employee
- [ ] Sidebar icons show
- [ ] Sidebar collapse/expand works
- [ ] Theme toggle works
- [ ] Header displays correctly

---

## 🧪 Testing Phase 4: Agent Dashboard (New)

### Test Agent Route:

Navigate to: **http://localhost:3000/agent**

**Expected Results:**

- [ ] Agent dashboard loads
- [ ] AgentSidebar displays (not AppSidebar)
- [ ] Menu shows: Dashboard, Merchant, Profile
- [ ] Dashboard overview stats display
- [ ] Quick Actions buttons visible
- [ ] Sidebar collapse/expand works
- [ ] Responsive on mobile
- [ ] Dark mode works

---

## 🧪 Testing Phase 5: Merchant Page

### Test Merchant Route:

Navigate to: **http://localhost:3000/agent/merchant**

**Expected Results:**

- [ ] Merchant page loads
- [ ] Page title shows "Merchant Management"
- [ ] Form fields display (placeholder form)
- [ ] "Save Merchant" button visible
- [ ] Input fields are interactive
- [ ] Form structure is clear
- [ ] Mobile layout works

---

## 🧪 Testing Phase 6: Profile Page

### Test Profile Route:

Navigate to: **http://localhost:3000/agent/profile**

**Expected Results:**

- [ ] Profile page loads
- [ ] Profile information displays
- [ ] Account settings section visible
- [ ] Buttons are clickable
- [ ] Form layout is clean
- [ ] Responsive design works

---

## 🧪 Testing Phase 7: Sidebar Navigation

### Test Sidebar Links:

From Agent Dashboard, click each menu item

**Expected Results:**

| Menu Item | Route           | Status   |
| --------- | --------------- | -------- |
| Dashboard | /agent          | ✅ Loads |
| Merchant  | /agent/merchant | ✅ Loads |
| Profile   | /agent/profile  | ✅ Loads |

**Additional Checks:**

- [ ] Active link highlighting works
- [ ] Navigation is smooth
- [ ] Breadcrumbs update (if applicable)
- [ ] Page transitions work

---

## 🧪 Testing Phase 8: Role Switching (Optional)

### Test Role Context:

Add temporary role switcher in browser console

```javascript
// In browser console:
localStorage.setItem('userRole', 'agent');
location.reload();
```

**Expected Results:**

- [ ] Role persists after reload
- [ ] Sidebar updates
- [ ] Menu items change appropriately
- [ ] User still sees agent dashboard

---

## 🧪 Testing Phase 9: Responsive Design

### Test on Different Screen Sizes:

| Screen           | Test              | Expected                     |
| ---------------- | ----------------- | ---------------------------- |
| Desktop (1920px) | Sidebar + Content | ✅ Two columns visible       |
| Tablet (768px)   | Sidebar collapses | ✅ Menu hidden, icon visible |
| Mobile (375px)   | Mobile sidebar    | ✅ Hamburger menu works      |

**Verification Points:**

- [ ] Layout reflows correctly
- [ ] Text is readable
- [ ] Buttons are clickable
- [ ] No horizontal scroll
- [ ] Images scale properly

---

## 🧪 Testing Phase 10: Dark Mode

### Test Dark Mode Toggle:

1. Click theme toggle button (top-right)
2. Verify colors change
3. Reload page

**Expected Results:**

- [ ] Dark background applies
- [ ] Text is visible
- [ ] Sidebar darkens
- [ ] Dark mode persists after reload
- [ ] Light mode still works
- [ ] Colors have sufficient contrast

---

## 🧪 Testing Phase 11: Console Errors

### Check Browser Console:

Open DevTools (F12) and check Console tab

**Expected Result:**

- [ ] No JavaScript errors
- [ ] No TypeScript errors
- [ ] No warning about missing dependencies
- [ ] No CORS issues
- [ ] No React warnings

---

## 🧪 Testing Phase 12: Performance

### Check Performance:

Open DevTools → Performance tab

**Expected Results:**

- [ ] Page load < 3 seconds
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] No layout thrashing

---

## 🧪 Testing Phase 13: Links & Navigation

### Test All Links:

**Admin Area:**

- [ ] Home link (`/`)
- [ ] User Profile link
- [ ] Employee link

**Agent Area:**

- [ ] Dashboard link (`/agent`)
- [ ] Merchant link (`/agent/merchant`)
- [ ] Profile link (`/agent/profile`)

---

## 🧪 Testing Phase 14: Form Elements

### Test Merchant Page Form:

1. Click form inputs
2. Type text
3. Click buttons

**Expected Results:**

- [ ] Inputs accept text
- [ ] Inputs have proper styling
- [ ] Buttons are clickable
- [ ] Form labels display correctly
- [ ] Placeholder text shows
- [ ] No console errors on input

---

## 🧪 Testing Phase 15: Import/Export Verification

### Check All Imports:

```tsx
// These should work without errors:
import { useRole } from '@/context/RoleContext';
import { UserRole } from '@/types/roles';
import AgentSidebar from '@/layout/AgentSidebar';
```

**Expected Result:**

- [ ] All imports resolve
- [ ] No "cannot find module" errors
- [ ] Path aliases work (@/ paths)

---

## 🧪 Testing Phase 16: Hooks Usage

### Test useRole Hook:

Create a test component:

```tsx
'use client';
import { useRole } from '@/context/RoleContext';

export default function TestHook() {
  const { userRole, menuItems, setRole } = useRole();

  return (
    <div>
      <p>Current Role: {userRole}</p>
      <p>Menu Items: {menuItems.length}</p>
    </div>
  );
}
```

**Expected Results:**

- [ ] Hook initializes without error
- [ ] userRole has a value
- [ ] menuItems is an array
- [ ] setRole function exists

---

## 🧪 Testing Phase 17: Context Providers

### Verify All Providers:

Check `src/app/layout.tsx` hierarchy:

```
html
  └── body
      └── Provider (Redux)
          └── PersistGate
              └── CustomAlertContextProvider
                  └── RoleProvider ← NEW
                      └── ThemeProvider
                          └── SidebarProvider
                              └── children
```

**Expected Results:**

- [ ] All providers nest correctly
- [ ] No provider errors in console
- [ ] Context hooks work throughout app

---

## 🧪 Testing Phase 18: TypeScript Compilation

### Run TypeScript Check:

```bash
npx tsc --noEmit
```

**Expected Result:**

- [ ] No TypeScript errors
- [ ] No unused variable warnings
- [ ] Type checking passes

---

## 🧪 Testing Phase 19: ESLint Check

### Run ESLint:

```bash
npm run lint
```

**Expected Result:**

- [ ] No critical errors
- [ ] Code style consistent
- [ ] No import issues

---

## 🧪 Testing Phase 20: Production Build

### Build for Production:

```bash
npm run build
```

**Expected Results:**

- [ ] Build completes successfully
- [ ] No warnings in build output
- [ ] .next folder created
- [ ] Static analysis passes
- [ ] Build size acceptable

---

## 📋 Integration Testing Checklist

### User Flow 1: Agent Dashboard Access

- [ ] Navigate to `/agent`
- [ ] See Agent Dashboard
- [ ] Sidebar shows agent menu
- [ ] Stats cards display
- [ ] Quick actions visible

### User Flow 2: Add Merchant

- [ ] Click "Merchant" in sidebar
- [ ] Form displays
- [ ] Can type in form fields
- [ ] Submit button clickable

### User Flow 3: Go to Profile

- [ ] Click "Profile" in sidebar
- [ ] Profile page loads
- [ ] Profile information displays
- [ ] Account settings visible

### User Flow 4: Return to Dashboard

- [ ] Click "Dashboard" in sidebar
- [ ] Agent dashboard loads
- [ ] Stats refresh
- [ ] All features work

---

## 🐛 Common Issues & Solutions

### Issue: Sidebar not showing

**Solution:**

- [ ] Check RoleProvider in root layout
- [ ] Clear browser cache
- [ ] Verify AgentSidebar component imports
- [ ] Check console for errors

### Issue: Pages not loading

**Solution:**

- [ ] Verify folder structure matches pattern
- [ ] Check page.tsx files exist
- [ ] Verify routes in RoleContext menu config
- [ ] Check URL spelling

### Issue: Role not persisting

**Solution:**

- [ ] Check localStorage available
- [ ] Verify UserRole enum values
- [ ] Check setRole is being called
- [ ] Verify browser allows localStorage

### Issue: Styles not applying

**Solution:**

- [ ] Check Tailwind CSS compiled
- [ ] Verify className syntax
- [ ] Clear `.next` folder: `rm -rf .next`
- [ ] Restart dev server

### Issue: Build fails

**Solution:**

- [ ] Check TypeScript compilation: `npx tsc --noEmit`
- [ ] Verify all imports exist
- [ ] Check for circular dependencies
- [ ] Review build output messages

---

## ✅ Final Verification

Before considering setup complete, verify:

### Functionality

- [ ] Admin dashboard works (existing)
- [ ] Agent dashboard works (new)
- [ ] All navigation works
- [ ] Responsive design works
- [ ] Dark mode works
- [ ] Sidebar toggle works

### Code Quality

- [ ] No console errors
- [ ] TypeScript compilation successful
- [ ] ESLint passes
- [ ] Build succeeds
- [ ] No security warnings

### Performance

- [ ] Page load time acceptable
- [ ] No memory leaks
- [ ] Smooth animations
- [ ] No janky scrolling

### Documentation

- [ ] QUICK_START.md reviewed
- [ ] ROLE_MANAGEMENT_GUIDE.md understood
- [ ] CODE_EXAMPLES.md available
- [ ] ARCHITECTURE.md referenced
- [ ] This checklist completed

---

## 🎉 Sign-Off

**Setup Date:** ******\_\_\_******

**Verified By:** ******\_\_\_******

**Notes:**

```
_________________________________________________
_________________________________________________
_________________________________________________
```

**Status:** ✅ COMPLETE AND VERIFIED

---

**Next Steps:**

1. Add your merchant form component
2. Integrate with authentication
3. Connect to backend API
4. Test with real data
5. Deploy to staging
6. Final acceptance testing
7. Deploy to production

---

For any issues during testing, refer to:

- **QUICK_START.md** - Quick reference
- **ROLE_MANAGEMENT_GUIDE.md** - Detailed guide
- **CODE_EXAMPLES.md** - Implementation examples
- **ARCHITECTURE.md** - System design
