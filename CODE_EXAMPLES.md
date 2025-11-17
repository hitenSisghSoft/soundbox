# Code Examples & Patterns

## 🔐 Authentication Integration Example

### Complete Login Flow

```tsx
// src/components/auth/SignInForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRole } from '@/context/RoleContext';
import { UserRole } from '@/types/roles';

export default function SignInForm() {
  const router = useRouter();
  const { setUser } = useRole();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Call your API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const { user, token } = data;

      // Validate role
      if (!Object.values(UserRole).includes(user.role)) {
        throw new Error('Invalid role');
      }

      // Set user in RoleContext
      setUser({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as UserRole,
      });

      // Save token to localStorage/cookies
      localStorage.setItem('authToken', token);

      // Redirect to role-based dashboard
      router.push(`/${user.role}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
      />
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Password"
      />
      <button disabled={loading}>{loading ? 'Loading...' : 'Sign In'}</button>
    </form>
  );
}
```

---

## 📋 Merchant Form Example

### Complete Merchant Form Component

```tsx
// src/components/merchant/MerchantForm.tsx
'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/useToast'; // or your notification hook
import Label from '@/components/form/Label';
import Input from '@/components/form/input/InputField';

interface MerchantFormData {
  businessName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  businessType: string;
  taxId?: string;
  description?: string;
}

export default function MerchantForm() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<MerchantFormData>({
    businessName: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    businessType: '',
    taxId: '',
    description: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.businessName.trim()) {
      showToast('Business name is required', 'error');
      return false;
    }
    if (!formData.email.trim()) {
      showToast('Email is required', 'error');
      return false;
    }
    if (!formData.phone.trim()) {
      showToast('Phone is required', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch('/api/merchants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create merchant');
      }

      const result = await response.json();
      showToast('Merchant created successfully!', 'success');

      // Reset form
      setFormData({
        businessName: '',
        email: '',
        phone: '',
        country: '',
        state: '',
        city: '',
        businessType: '',
        taxId: '',
        description: '',
      });

      // Optionally refresh merchant list or navigate
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'An error occurred', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">Add New Merchant</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Name */}
        <div>
          <Label>
            Business Name <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Enter business name"
          />
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label>
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="merchant@example.com"
            />
          </div>
          <div>
            <Label>
              Phone <span className="text-red-500">*</span>
            </Label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <Label>Country</Label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 dark:border-gray-800 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
            </select>
          </div>
          <div>
            <Label>State/Province</Label>
            <Input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
            />
          </div>
          <div>
            <Label>City</Label>
            <Input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
            />
          </div>
        </div>

        {/* Business Type and Tax ID */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label>Business Type</Label>
            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 dark:border-gray-800 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select type</option>
              <option value="retail">Retail</option>
              <option value="wholesale">Wholesale</option>
              <option value="service">Service</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <Label>Tax ID (Optional)</Label>
            <Input
              type="text"
              name="taxId"
              value={formData.taxId}
              onChange={handleChange}
              placeholder="Tax ID"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <Label>Description (Optional)</Label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Business description"
            rows={4}
            className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 dark:border-gray-800 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-brand-500 hover:bg-brand-600 rounded-lg px-6 py-2 text-white transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Merchant'}
          </button>
          <button
            type="reset"
            className="rounded-lg border border-gray-200 px-6 py-2 text-gray-700 transition hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
```

### Usage in Merchant Page

```tsx
// src/app/(agent)/(agent-pages)/merchant/page.tsx
import MerchantForm from '@/components/merchant/MerchantForm';
import MerchantList from '@/components/merchant/MerchantList';

export default function MerchantPage() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 lg:col-span-5">
        <MerchantForm />
      </div>
      <div className="col-span-12 lg:col-span-7">
        <MerchantList />
      </div>
    </div>
  );
}
```

---

## 🛡️ Protected Route Component

```tsx
// src/components/common/ProtectedRoute.tsx
'use client';

import { useRole } from '@/context/RoleContext';
import { UserRole } from '@/types/roles';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  requiredRoles: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ProtectedRoute({
  requiredRoles,
  children,
  fallback = <div>Access Denied</div>,
}: ProtectedRouteProps) {
  const { userRole } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!requiredRoles.includes(userRole)) {
      router.push('/');
    }
  }, [userRole, requiredRoles, router]);

  if (!requiredRoles.includes(userRole)) {
    return fallback;
  }

  return <>{children}</>;
}
```

### Usage

```tsx
import ProtectedRoute from '@/components/common/ProtectedRoute';
import { UserRole } from '@/types/roles';

export default function SensitivePage() {
  return (
    <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.AGENT]}>
      <div>This content is only visible to admins and agents</div>
    </ProtectedRoute>
  );
}
```

---

## 🎯 Role-Based Feature Toggle

```tsx
// src/hooks/useFeature.ts
'use client';

import { useRole } from '@/context/RoleContext';
import { UserRole } from '@/types/roles';

const featureFlags: Record<UserRole, string[]> = {
  [UserRole.ADMIN]: ['merchants', 'reports', 'settings', 'users', 'analytics'],
  [UserRole.AGENT]: ['merchants', 'reports'],
  [UserRole.OPERATIONS]: ['reports', 'analytics'],
  [UserRole.SUPPORT]: ['tickets', 'users'],
  [UserRole.MERCHANT]: ['dashboard', 'orders'],
};

export function useFeature(featureName: string) {
  const { userRole } = useRole();

  const isEnabled = featureFlags[userRole]?.includes(featureName) ?? false;

  return { isEnabled };
}
```

### Usage

```tsx
import { useFeature } from '@/hooks/useFeature';

export default function Dashboard() {
  const { isEnabled: showReports } = useFeature('reports');

  return <div>{showReports && <ReportsWidget />}</div>;
}
```

---

## 📊 Merchant List Component

```tsx
// src/components/merchant/MerchantList.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Merchant {
  id: string;
  businessName: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export default function MerchantList() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMerchants();
  }, []);

  const fetchMerchants = async () => {
    try {
      const response = await fetch('/api/merchants', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch merchants');
      }

      const data = await response.json();
      setMerchants(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="mb-4 text-lg font-semibold">Merchants List</h2>

      {merchants.length === 0 ? (
        <p className="text-gray-500">No merchants yet. Create one to get started!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="px-4 py-2 text-left">Business Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {merchants.map((merchant) => (
                <tr
                  key={merchant.id}
                  className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-3">{merchant.businessName}</td>
                  <td className="px-4 py-3">{merchant.email}</td>
                  <td className="px-4 py-3">{merchant.phone}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                        merchant.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {merchant.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/agent/merchant/${merchant.id}`}>
                      <button className="text-blue-500 hover:underline">Edit</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
```

---

## 🔄 Middleware for Route Protection (Optional)

```tsx
// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const roleRoutes = {
  admin: '/admin',
  agent: '/agent',
  operations: '/operations',
  support: '/support',
  merchant: '/merchant',
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get role from cookies or session
  const role = request.cookies.get('userRole')?.value;

  // If no role and trying to access protected route, redirect to login
  if (!role && Object.values(roleRoutes).some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // If role doesn't match route, redirect to user's dashboard
  if (role) {
    const expectedRoute = roleRoutes[role as keyof typeof roleRoutes];
    if (!pathname.startsWith(expectedRoute) && pathname !== '/') {
      return NextResponse.redirect(new URL(expectedRoute, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/(admin|agent|operations|support|merchant)/:path*'],
};
```

---

## 🧪 Test Role Switching Component

```tsx
// src/components/dev/RoleSwitcher.tsx
'use client';

import { useRole } from '@/context/RoleContext';
import { UserRole } from '@/types/roles';
import { useState } from 'react';

export default function RoleSwitcher() {
  const { setRole, userRole } = useRole();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-4 bottom-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full bg-blue-500 px-4 py-2 text-white shadow-lg hover:bg-blue-600"
      >
        Role: {userRole}
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-12 rounded-lg bg-white p-2 shadow-lg dark:bg-gray-800">
          {Object.values(UserRole).map((role) => (
            <button
              key={role}
              onClick={() => {
                setRole(role);
                setIsOpen(false);
              }}
              className={`block w-full rounded px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${
                userRole === role ? 'bg-blue-100 dark:bg-blue-900' : ''
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## 🔗 API Integration Pattern

```tsx
// src/network/merchantApi.ts
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const merchantApi = axios.create({
  baseURL: `${API_BASE}/merchants`,
});

// Add token to requests
merchantApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const merchantService = {
  getAll: () => merchantApi.get('/'),
  getById: (id: string) => merchantApi.get(`/${id}`),
  create: (data: any) => merchantApi.post('/', data),
  update: (id: string, data: any) => merchantApi.put(`/${id}`, data),
  delete: (id: string) => merchantApi.delete(`/${id}`),
};

export default merchantService;
```

### Usage

```tsx
'use client';

import { useEffect, useState } from 'react';
import merchantService from '@/network/merchantApi';

export default function MerchantList() {
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    merchantService
      .getAll()
      .then((res) => setMerchants(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return <div>{/* Render merchants */}</div>;
}
```

---

These examples provide a complete, production-ready implementation pattern for your multi-role system. Adapt them to your specific needs!
