'use client';

import { useSearchParams } from 'next/navigation';
import AddMerchantStore from '../addMerchantStore';
import { Suspense } from 'react';

function CreateStoreContent() {
  const searchParams = useSearchParams();
  const merchantId = searchParams.get('merchantId');
  
  console.log('Create Store Page - Merchant ID:', merchantId);

  if (!merchantId) {
    return (
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                <svg
                  className="h-8 w-8 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
                Merchant ID Required
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Please select a merchant first to create a store.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">
            Create New Store
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Add a new store for the selected merchant
          </p>
        </div>
      </div>

      <div className="col-span-12">
        <AddMerchantStore isEditMode={false} merchantId={merchantId} />
      </div>
    </div>
  );
}

export default function CreateStorePage() {
  return (
    <Suspense fallback={
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    }>
      <CreateStoreContent />
    </Suspense>
  );
}
