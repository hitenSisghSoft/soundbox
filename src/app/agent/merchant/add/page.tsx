'use client';

import ComponentCard from '@/components/common/ComponentCard';
import Input from '@/components/form/input/InputField';
import Button from '@/components/ui/button/Button';
import { CustomAlertContext } from '@/context/CustomAlertContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

type MerchantFormInterface = yup.InferType<typeof MerchantValidation>;

const MerchantValidation = yup.object().shape({
  name: yup.string().required('Name is required *'),
  email: yup.string().email('Invalid Email').required('Email is required *'),
  mobile: yup
    .string()
    .required('Mobile is required *')
    .max(10, "Mobile number can't be more than 10 digits")
    .min(10, 'Mobile number must be at least 10 digits'),
  shift: yup.string().required('Shift is required *').trim(),
  role: yup.string().required('Role is required *').trim(),
  company_name: yup.string().required('Role is required *').trim(),
  address: yup.string().required('Address is required *'),
  city: yup.string().required('City is required *'),
  state: yup.string().required('State is required *'),
  country: yup.string().required('Country is required *'),
  zip_code: yup
    .string()
    .required('ZipCode is required *')
    .max(6, "ZipCode can't be more than 6 digits")
    .min(4, 'ZipCode must be at least 4 digits'),
  pan_number: yup.string().required('Pan Number is required *'),
  gst_number: yup.string().required('Gst Number is required *'),
  temporary_account_number: yup.string().required('Temporary Account Number is required *'),
});

export default function AddMerchantPage({ data = null }) {
  const router = useRouter();
  const { setToastNotification } = useContext<any>(CustomAlertContext);
  const [loading, setLoading] = useState(false);

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();

  //     // Validation
  //     if (!formData.name.trim() || !formData.email.trim() || !formData.mobile.trim()) {
  //       setToastNotification('All fields are required', 'error');
  //       return;
  //     }

  //     setLoading(true);

  //     try {
  //       const response = await apiConnector({
  //         method: 'POST',
  //         url: merchantEndPoints?.CREATE_MERCHANT_API,
  //         bodyData: formData,
  //       });

  //       if (response?.data?.data) {
  //         setToastNotification('Merchant added successfully', 'success');
  //         router.push('/agent/merchant');
  //       }
  //     } catch (error: any) {
  //       setToastNotification(error?.message || 'Failed to add merchant', 'error');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MerchantFormInterface>({
    resolver: yupResolver(MerchantValidation),
    defaultValues: {
      name: data ? data?.name : '',
      email: data ? data?.email : '',
      mobile: data ? data?.mobile : '',
      company_name: data ? data?.company_name : '',
      address: data ? data?.address : '',
    },
  });

  // console.log(data?.name,"defaultValues");

  const onSubmitHandler = (data: any) => {
    console.log(data, 'dataaa');
  };
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Add New Merchant</h1>
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

      {/* Add Merchant Form */}
      <div className="col-span-12 md:col-span-12">
        {/* <form onSubmit={handleSubmit} className="space-y-6"> */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white">
            Merchant Information
          </h2>

          {/* Merchant Name */}
          <ComponentCard title="Employee Form">
            <div className="mx-6 space-y-4">
              <form
                onSubmit={(e) => {
                  console.log('FORM NATIVE SUBMIT');
                  e.preventDefault();
                  handleSubmit(onSubmitHandler)(e);
                }}
              >
                {/* Two Column Layout */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Name - Half Width */}
                  <div>
                    <Input
                      type="text"
                      id="input"
                      placeholder="Enter Name here"
                      label="Name"
                      error={errors?.name?.message}
                      control={control}
                      name="name"
                    />
                  </div>

                  {/* Email - Half Width */}
                  <div>
                    <Input
                      type="text"
                      id="input"
                      placeholder="Enter Email here"
                      name="email"
                      label="Email"
                      error={errors?.email?.message}
                      control={control}
                    />
                  </div>

                  {/* Mobile - Half Width */}
                  <div>
                    <Input
                      type="text"
                      id="input"
                      placeholder="Enter Mobile here"
                      name="mobile"
                      label="Mobile"
                      error={errors?.mobile?.message}
                      control={control}
                    />
                  </div>

                  {/* Company Name - Half Width */}
                  <div>
                    <Input
                      type="text"
                      id="input"
                      placeholder="Enter Company name"
                      name="company_name"
                      label="Company Name"
                      error={errors?.company_name?.message}
                      control={control}
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      id="input"
                      placeholder="Enter Address "
                      name="address"
                      label="Address"
                      error={errors?.address?.message}
                      control={control}
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      id="input"
                      placeholder="Enter City name"
                      name="city"
                      label="City"
                      error={errors?.city?.message}
                      control={control}
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      id="input"
                      placeholder="Enter State name"
                      name="state"
                      label="State"
                      error={errors?.state?.message}
                      control={control}
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      id="input"
                      placeholder="Enter Country"
                      name="country"
                      label="Country Name"
                      error={errors?.country?.message}
                      control={control}
                    />
                  </div>
                  <div>
                    <Input
                      type="Number"
                      id="input"
                      placeholder="Enter ZipCode "
                      name="zip_code"
                      label="ZipCode"
                      error={errors?.zip_code?.message}
                      control={control}
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      id="input"
                      placeholder="Enter PanNumber "
                      name="pan_number"
                      label="Pan Number"
                      error={errors?.pan_number?.message}
                      control={control}
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      id="input"
                      placeholder="Enter GST Number "
                      name="gst_number"
                      label="GST Number"
                      error={errors?.gst_number?.message}
                      control={control}
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      id="input"
                      placeholder="Enter Temporary Account Number"
                      name="temporary_account_number"
                      label="Temporary Account"
                      error={errors?.temporary_account_number?.message}
                      control={control}
                    />
                  </div>
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
                    Add
                  </Button>
                </div>
              </form>
            </div>
          </ComponentCard>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
}
