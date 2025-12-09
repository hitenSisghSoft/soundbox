'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, NavItem, UserWithRole } from '@/types/roles';
import { GridIcon, UserCircleIcon, BoxCubeIcon } from '@/icons/index';

interface RoleContextType {
  currentUser: UserWithRole | null;
  userRole: UserRole;
  menuItems: NavItem[];
  setUser: (user: UserWithRole | null) => void;
  setRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

// Menu configuration for each role
const roleMenuConfig: Record<UserRole, NavItem[]> = {
  [UserRole.ADMIN]: [
    {
      icon: GridIcon,
      name: 'Dashboard',
      subItems: [{ name: 'Ecommerce', path: '/', pro: false }],
    },
    {
      icon: UserCircleIcon,
      name: 'User Profile',
      path: '/profile',
    },
    {
      icon: BoxCubeIcon,
      name: 'Employees',
      path: '/employee',
    },
  ],
  [UserRole.AGENT]: [
    {
      icon: GridIcon,
      name: 'Dashboard',
      subItems: [{ name: 'Overview', path: '/agent', pro: false }],
    },

    {
      icon: UserCircleIcon,
      name: 'Profile',
      path: '/agent/profile',
    },
    {
      icon: BoxCubeIcon,
      name: 'Merchant',
      path: '/agent/merchant',
    },
  ],
  [UserRole.OPERATIONS]: [
    {
      icon: GridIcon,
      name: 'Dashboard',
      subItems: [{ name: 'Overview', path: '/operations', pro: false }],
    },
  ],
  [UserRole.SUPPORT]: [
    {
      icon: GridIcon,
      name: 'Dashboard',
      subItems: [{ name: 'Overview', path: '/support', pro: false }],
    },
  ],
  [UserRole.MERCHANT]: [
    {
      icon: GridIcon,
      name: 'Dashboard',
      subItems: [{ name: 'Overview', path: '/merchant', pro: false }],
    },
  ],
};

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserWithRole | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.ADMIN);

  useEffect(() => {
    // In a real application, fetch the user role from session/token
    // For now, you can check localStorage or set it from your auth service
    const savedRole = localStorage.getItem('userRole') as UserRole | null;
    if (savedRole) {
      setUserRole(savedRole);
    }

    // Example: Fetch user from session or auth context
    // const user = await fetchUserFromSession();
    // if (user) {
    //   setCurrentUser(user);
    //   setUserRole(user.role);
    // }
  }, []);

  const handleSetUser = (user: UserWithRole | null) => {
    setCurrentUser(user);
    if (user) {
      setUserRole(user.role);
      localStorage.setItem('userRole', user.role);
    }
  };

  const handleSetRole = (role: UserRole) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);
  };

  const menuItems = roleMenuConfig[userRole] || roleMenuConfig[UserRole.ADMIN];

  return (
    <RoleContext.Provider
      value={{
        currentUser,
        userRole,
        menuItems,
        setUser: handleSetUser,
        setRole: handleSetRole,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};
