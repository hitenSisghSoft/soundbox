import Input from '@/components/common/InputField';
import Button from '@/components/ui/button/Button';
import { CustomAlertContext } from '@/context/CustomAlertContext';
import { merchantEndPoints } from '@/helper/ApiEndPoints';
import { apiConnector } from '@/network/Apiconnector';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useState } from 'react';
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

const AddMerchantStore = ({ item }: { item: any }) => {
  const { setToastNotification } = useContext<any>(CustomAlertContext);
  const [loading, setLoading] = useState(false);
console.log(item,"itemmsss");

  const merchantId = item?._id;
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MerchantFormData>({
    resolver: yupResolver(EmployeeValidation),
    defaultValues: {
      merchant_name: item?.merchant_name || '',
      email: item?.email || '',
      mobile_number: item?.mobile_number || '',
    },
  });

  const onSubmitHandler = async (data: any) => {
    setLoading(false);
    await apiConnector({
      method: 'PUT',
      url: `${merchantEndPoints?.UPDATE_MERCHANT_API}`,
      bodyData: data,
    })
      .then((response: any) => {
        setLoading(false);
        setToastNotification(response?.data?.message, 'success');
        // router.push('/agent/merchant');

        reset();
      })
      .catch((error: any) => {
        setToastNotification(error?.message, 'error');
        setLoading(false);
      });
  };

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      

      {/* Edit Merchant Form */}
      <div className="col-span-12 md:col-span-12">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          
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
};

export default AddMerchantStore;
