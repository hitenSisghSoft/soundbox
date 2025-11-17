import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Merchant Management | Agent Dashboard',
  description: 'Manage your merchants',
};

export default function MerchantPage() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">
            Merchant Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Add and manage your merchants here. You will replace this content with your own merchant
            form and list.
          </p>
        </div>
      </div>

      {/* Add Merchant Form Placeholder */}
      <div className="col-span-12">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Add New Merchant
          </h2>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Replace this content with your merchant form component.
          </p>
          {/* Example form structure - replace with your actual form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Merchant Name
              </label>
              <input
                type="text"
                placeholder="Enter merchant name"
                className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 outline-none dark:border-gray-800 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 outline-none dark:border-gray-800 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <button className="bg-brand-500 hover:bg-brand-600 rounded-lg px-6 py-2 text-sm font-medium text-white transition">
              Save Merchant
            </button>
          </div>
        </div>
      </div>

      {/* Merchants List Placeholder */}
      <div className="col-span-12">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Merchants List
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your merchant list will appear here. Add your table component or list component.
          </p>
        </div>
      </div>
    </div>
  );
}
