'use client';

import { CustomAlertContext } from '@/context/CustomAlertContext';
import { merchantEndPoints } from '@/helper/ApiEndPoints';
import { apiConnector } from '@/network/Apiconnector';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';

interface MerchantData {
  id?: string;
  merchant_name?: string;
  email?: string;
  mobile_number?: string;
}

export default function MerchantPage() {
  const router = useRouter();
  const [searching, setSearching] = useState(false);
  const { setToastNotification } = useContext<any>(CustomAlertContext);
  const [merchantNumber, setMerchantNumber] = useState('');
  const [merchantData, setMerchantData] = useState<MerchantData | null>(null);
  const [searched, setSearched] = useState(false);
  console.log(merchantData, 'merchantData');

  const searchMerchant = async () => {
    // Validation: Check if merchant number is entered
    if (!merchantNumber.trim()) {
      setToastNotification('Please enter merchant number', 'error');
      return;
    }

    // Reset previous search data before searching
    setMerchantData(null);
    setSearching(true);

    try {
      // Build the API URL
      const apiUrl = `${merchantEndPoints?.GET_MERCHANT_By_NUMBER_API}${merchantNumber}`;
      console.log('🔍 Searching merchant with URL:', apiUrl);

      // Make API call
      const response = await apiConnector({
        method: 'GET',
        url: apiUrl,
      });

      console.log('✅ API Response:', response);

      // Check if merchant data exists in response
      if (response?.data?.data) {
        setMerchantData(response?.data?.data[0]);
        setSearched(true);
        setToastNotification('Merchant found!', 'success');
      } else if (response?.status === 200) {
        // Merchant not found - show "No data available" message
        setMerchantData(null);
        setSearched(true);
        setToastNotification('No merchant found with this number', 'info');
      } else {
        // Unexpected response
        setMerchantData(null);
        setSearched(true);
        setToastNotification('Unexpected response from server', 'error');
      }
    } catch (error: any) {
      console.error('❌ API Error:', error);

      // Check if it's a 404 (not found)
      if (error?.response?.status === 404) {
        setMerchantData(null);
        setSearched(true);
        setToastNotification('No merchant found with this number', 'info');
      } else {
        setMerchantData(null);
        setSearched(true);
        const errorMessage =
          error?.response?.data?.message || error?.message || 'Failed to search merchant';
        setToastNotification(errorMessage, 'error');
      }
    } finally {
      setSearching(false);
    }
  };

  const handleEditMerchant = () => {
    if (merchantData?.id) {
      router.push(`/agent/merchant/edit/${merchantData.id}`);
    }
  };

  const handleAddMerchant = () => {
    router.push('/agent/merchant/add');
  };

  const handleClearSearch = () => {
    setMerchantNumber('');
    setMerchantData(null);
    setSearched(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !searching) {
      searchMerchant();
    }
  };
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">
            Merchant Management
          </h1>
        </div>
      </div>

      {/* Search Merchant Form */}
      <div className="col-span-12">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Search Merchant
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Merchant Number
              </label>
              <input
                onChange={(e) => setMerchantNumber(e.target.value)}
                onKeyPress={handleKeyPress}
                type="text"
                value={merchantNumber}
                placeholder="Enter merchant number"
                className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 outline-none dark:border-gray-800 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <button
              className="bg-brand-500 hover:bg-brand-600 rounded-lg px-6 py-2 text-sm font-medium text-white transition disabled:opacity-50"
              onClick={searchMerchant}
              disabled={searching || !merchantNumber.trim()}
            >
              {searching ? 'Searching...' : 'Search Merchant'}
            </button>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searched && (
        <>
          {merchantData ? (
            // Merchant Found - Show Details
            <div className="col-span-12">
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                  Merchant Details
                </h2>
                <div className="space-y-4">
                  {/* Merchant Info Grid */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* Name */}
                    <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Merchant Name
                      </p>
                      <p className="mt-2 line-clamp-3 text-lg font-semibold text-gray-800 dark:text-white">
                        {merchantData?.merchant_name || 'N/A'}
                      </p>
                    </div>

                    {/* Mobile */}
                    <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Mobile Number
                      </p>
                      <p className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
                        {merchantData?.mobile_number || 'N/A'}
                      </p>
                    </div>

                    {/* Email */}
                    <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Email Address
                      </p>
                      <p className="mt-2 line-clamp-3 text-lg font-semibold text-gray-800 dark:text-white">
                        {merchantData.email || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Edit Button */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleEditMerchant}
                      className="bg-brand-500 hover:bg-brand-600 inline-flex items-center justify-center rounded-lg px-6 py-2 text-sm font-medium text-white transition"
                    >
                      Edit Merchant
                    </button>
                    <button
                      onClick={handleClearSearch}
                      className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // No Merchant Found
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
                    No Merchant Found
                  </h3>
                  <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                    No merchant available with merchant number &quot;{merchantNumber}&quot;
                  </p>

                  {/* Add Merchant Button */}
                  <button
                    onClick={handleAddMerchant}
                    className="bg-brand-500 hover:bg-brand-600 inline-flex items-center justify-center rounded-lg px-6 py-2 text-sm font-medium text-white transition"
                  >
                    Add New Merchant
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
