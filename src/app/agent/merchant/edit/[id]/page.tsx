'use client';

import Input from '@/components/common/InputField';
import Button from '@/components/ui/button/Button';
import { CustomAlertContext } from '@/context/CustomAlertContext';
import { merchantEndPoints } from '@/helper/ApiEndPoints';
import { apiConnector } from '@/network/Apiconnector';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter, useParams } from 'next/navigation';
import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface MerchantFormData {
  id?: string;
  merchant_name: string;
  email: string;
  mobile_number: string;
  [key: string]: string | undefined;
}

const EmployeeValidation = yup.object().shape({
  merchant_name: yup.string().required('Merchant Name is required *'),
  email: yup.string().email('Invalid Email').required('Email is required *'),
  mobile_number: yup
    .string()
    .required('Mobile is required *')
    .max(10, "Mobile number can't be more than 10 digits")
    .min(10, 'Mobile number must be at least 10 digits'),
});

export default function EditMerchantPage() {
  const router = useRouter();
  const params = useParams();
  const merchantId = params.id as string;
  const { setToastNotification } = useContext<any>(CustomAlertContext);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch merchant data on mount
  useEffect(() => {
    setFetching(true);
    const fetchMerchantData = async () => {
      try {
        const response = await apiConnector({
          method: 'GET',
          url: `${merchantEndPoints?.GET_MERCHANT_By_ID_API}/${merchantId}`,
        });

        const data = response?.data?.data?.[0];
        if (data) {
          // setFormData(response?.data?.data[0]);
          reset({
            merchant_name: data.merchant_name || '',
            email: data.email || '',
            mobile_number: data.mobile_number || '',
          });
          // setFetching(false);
        } else {
          setToastNotification('Merchant not found', 'error');
          router.push('/agent/merchant');
        }
      } catch (error: any) {
        setToastNotification(error?.message || 'Failed to fetch merchant', 'error');
        router.push('/agent/merchant');
        // setFetching(false);
      } finally {
        setFetching(false);
      }
    };

    if (merchantId) {
      fetchMerchantData();
    }
  }, [merchantId, router]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MerchantFormData>({
    resolver: yupResolver(EmployeeValidation),
    defaultValues: {
      merchant_name: '',
      email: '',
      mobile_number: '',
    },
  });

  const onSubmitHandler = async (data: any) => {
    setLoading(false);
    await apiConnector({
      method: 'PUT',
      url: `${merchantEndPoints?.UPDATE_MERCHANT_API}/${merchantId}`,
      bodyData: data,
    })
      .then((response: any) => {
        setLoading(false);
        setToastNotification(response?.data?.message, 'success');
        router.push('/agent/merchant');

        reset();
      })
      .catch((error: any) => {
        setToastNotification(error?.message, 'error');
        setLoading(false);
      });
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
      <div className="col-span-12 md:col-span-12">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white">
            Update Merchant Information
          </h2>
          <form
            onSubmit={(e) => {
              handleSubmit(onSubmitHandler)(e);
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                type="text"
                id="input"
                placeholder="Enter Merchant Name "
                label="Merchant Name"
                error={errors?.merchant_name?.message}
                control={control}
                name="merchant_name"
              />
              <Input
                type="text"
                id="input"
                placeholder="Enter Email  "
                label="Email"
                error={errors?.email?.message}
                control={control}
                name="email"
              />
              <Input
                type="number"
                id="input"
                placeholder="Enter Mobile here"
                name="mobile_number"
                label="Mobile"
                error={errors?.mobile_number?.message}
                control={control}
              />
            </div>
            <div className="mb-4 flex justify-end">
              <Button
                size="sm"
                variant="primary"
                customBg="bg-brand-500"
                className="mt-5 px-12"
                disabled={loading}
                type="submit"
              >
                Edit
              </Button>
            </div>
          </form>

          {/* Action Buttons */}
        </div>
      </div>
    </div>
  );
}
