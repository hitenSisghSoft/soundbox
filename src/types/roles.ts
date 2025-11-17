// Role types and enums for multi-role support
export enum UserRole {
  ADMIN = 'admin',
  AGENT = 'agent',
  OPERATIONS = 'operations',
  SUPPORT = 'support',
  MERCHANT = 'merchant',
}

export interface NavItem {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
}

export interface RoleMenuItem {
  role: UserRole;
  items: NavItem[];
}

export interface UserWithRole {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Role-based route prefixes
export const roleRoutes = {
  [UserRole.ADMIN]: '/admin',
  [UserRole.AGENT]: '/agent',
  [UserRole.OPERATIONS]: '/operations',
  [UserRole.SUPPORT]: '/support',
  [UserRole.MERCHANT]: '/merchant',
} as const;

// Default role redirect
export const DEFAULT_ROLE = UserRole.ADMIN;
