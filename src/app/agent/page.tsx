import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Agent Dashboard | SoundBox Admin',
  description: 'Agent Dashboard Overview',
};

export default function AgentDashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">Agent Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome to your agent dashboard. Here you can manage merchants and view your overview.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="col-span-12 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Merchants</p>
          <p className="mt-2 text-3xl font-bold text-gray-800 dark:text-white">0</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-600 dark:text-gray-400">Active Merchants</p>
          <p className="mt-2 text-3xl font-bold text-gray-800 dark:text-white">0</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
          <p className="mt-2 text-3xl font-bold text-gray-800 dark:text-white">$0</p>
        </div>
      </div>

      {/* Placeholder for more content */}
      <div className="col-span-12">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Quick Actions
          </h2>
          <div className="flex gap-3">
            <button className="bg-brand-500 hover:bg-brand-600 rounded-lg px-4 py-2 text-sm font-medium text-white transition">
              Add Merchant
            </button>
            <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800">
              View All Merchants
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
