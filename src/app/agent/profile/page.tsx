import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Agent Profile | Agent Dashboard',
  description: 'Manage your profile',
};

export default function AgentProfilePage() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">Agent Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage your profile information.
          </p>
        </div>
      </div>

      {/* Profile Information */}
      <div className="col-span-12 md:col-span-6">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Profile Information
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Full Name</p>
              <p className="mt-1 text-gray-800 dark:text-white">Agent Name</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
              <p className="mt-1 text-gray-800 dark:text-white">agent@example.com</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Role</p>
              <p className="mt-1 text-gray-800 dark:text-white">Agent</p>
            </div>
            <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="col-span-12 md:col-span-6">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Account Settings
          </h2>
          <div className="space-y-4">
            <button className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800">
              Change Password
            </button>
            <button className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800">
              Two-Factor Authentication
            </button>
            <button className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 dark:border-red-800 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
