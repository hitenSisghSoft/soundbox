'use client';

import { CustomAlertContext } from '@/context/CustomAlertContext';
import { merchantEndPoints } from '@/helper/ApiEndPoints';
import { apiConnector } from '@/network/Apiconnector';
import { useRouter, useParams } from 'next/navigation';
import React, { useContext, useState, useEffect } from 'react';

interface MerchantFormData {
  id?: string;
  name: string;
  email: string;
  mobile: string;
  [key: string]: string | undefined;
}

export default function EditMerchantPage() {
  const router = useRouter();
  const params = useParams();
  const merchantId = params.id as string;
  const { setToastNotification } = useContext<any>(CustomAlertContext);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState<MerchantFormData>({
    name: '',
    email: '',
    mobile: '',
  });

  // Fetch merchant data on mount
  useEffect(() => {
    const fetchMerchantData = async () => {
      try {
        const response = await apiConnector({
          method: 'GET',
          url: `${merchantEndPoints?.GET_MERCHANT_By_NUMBER_API}/${merchantId}`,
        });

        if (response?.data?.data) {
          setFormData({
            id: response?.data?.data?.id,
            name: response?.data?.data?.name || '',
            email: response?.data?.data?.email || '',
            mobile: response?.data?.data?.mobile || '',
          });
        } else {
          setToastNotification('Merchant not found', 'error');
          router.push('/agent/merchant');
        }
      } catch (error: any) {
        setToastNotification(error?.message || 'Failed to fetch merchant', 'error');
        router.push('/agent/merchant');
      } finally {
        setFetching(false);
      }
    };

    if (merchantId) {
      fetchMerchantData();
    }
  }, [merchantId, router, setToastNotification]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.mobile.trim()) {
      setToastNotification('All fields are required', 'error');
      return;
    }

    setLoading(true);

    try {
      const response = await apiConnector({
        method: 'PUT',
        url: `${merchantEndPoints?.UPDATE_MERCHANT_API}/${merchantId}`,
        bodyData: {
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
        },
      });

      if (response?.data?.data) {
        setToastNotification('Merchant updated successfully', 'success');
        router.push('/agent/merchant');
      }
    } catch (error: any) {
      setToastNotification(error?.message || 'Failed to update merchant', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="inline-flex items-center">
          <div className="border-t-brand-500 h-8 w-8 animate-spin rounded-full border-4 border-gray-200"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading merchant data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Merchant</h1>
            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Merchant Form */}
      <div className="col-span-12 md:col-span-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white">
              Update Merchant Information
            </h2>

            {/* Merchant Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Merchant Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter merchant name"
                required
                className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 outline-none dark:border-gray-800 dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                required
                className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 outline-none dark:border-gray-800 dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* Mobile Number */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Enter mobile number"
                required
                className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 outline-none dark:border-gray-800 dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-brand-500 hover:bg-brand-600 flex-1 rounded-lg px-6 py-2 text-sm font-medium text-white transition disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Merchant'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 rounded-lg border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
