import Input from '@/components/common/InputField';
import Button from '@/components/ui/button/Button';
import { CustomAlertContext } from '@/context/CustomAlertContext';
import { merchantEndPoints } from '@/helper/ApiEndPoints';
import { apiConnector } from '@/network/Apiconnector';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';

interface MerchantFormData {
  id?: string;
 
  store_name: string;
  store_code: string;
  owner_name: string;
  owner_mobile: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  [key: string]: string | undefined;
}



const StoreValidation = yup.object().shape({
  store_name: yup.string().required('Store Name is required *'),
  store_code: yup.string().required('Store Code is required *'),
  owner_name: yup.string().required('Owner Name is required *'),
  owner_mobile: yup
    .string()
    .required('Owner Mobile is required *')
    .max(10, "Owner mobile can't be more than 10 digits")
    .min(10, 'Owner mobile must be at least 10 digits'),
  address: yup.string().required('Address is required *'),
  city: yup.string().required('City is required *'),
  state: yup.string().required('State is required *'),
  pincode: yup
    .string()
    .required('Pincode is required *')
    .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
});

const AddMerchantStore = ({ 
  item, 
  setMerchantApiCall, 
  setOpenIndex, 
  isEditMode = true,
  merchantId 
}: { 
  item?: any; 
  setMerchantApiCall?: any; 
  setOpenIndex?: any;
  isEditMode?: boolean;
  merchantId?: string;
}) => {
  const { setToastNotification } = useContext<any>(CustomAlertContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  console.log('AddMerchantStore - item:', item);
  console.log('AddMerchantStore - merchantId prop:', merchantId);
  console.log('AddMerchantStore - isEditMode:', isEditMode);

  const storeId = item?._id;
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MerchantFormData>({
    resolver: yupResolver(StoreValidation),
    defaultValues: {
      store_name: item?.store_name || '',
      store_code: item?.store_code || '',
      owner_name: item?.owner_name || '',
      owner_mobile: item?.owner_mobile || '',
      address: item?.address || '',
      city: item?.city || '',
      state: item?.state || '',
      pincode: item?.pincode || '',
    },
  });

  // Handler for creating a new store
  const handleCreateStore = async (data: any) => {
    setLoading(true);
    const payload = {
      ...data,
      merchant_id: merchantId,
    };
    
    console.log('Creating store with payload:', payload);
    console.log('Merchant ID being used:', merchantId);
    
    await apiConnector({
      method: 'POST',
      url: `${merchantEndPoints?.CREATE_MERCHANT_STORES_API}`,
      bodyData: payload,
    })
      .then((response: any) => {
        setLoading(false);
        setToastNotification(response?.data?.message || 'Store created successfully!', 'success');
        reset();
        // Navigate back to merchant page
        router.push('/agent/merchant');
      })
      .catch((error: any) => {
        setToastNotification(error?.message || 'Failed to create store', 'error');
        setLoading(false);
      });
  };

  // Handler for updating an existing store
  const handleUpdateStore = async (data: any) => {
    setLoading(true);
    await apiConnector({
      method: 'PUT',
      url: `${merchantEndPoints?.UPDATE_MERCHANT_STORES_API}/${storeId}`,
      bodyData: data,
    })
      .then((response: any) => {
        setLoading(false);
        setToastNotification(response?.data?.message || 'Store updated successfully!', 'success');
        if (setMerchantApiCall) setMerchantApiCall((prev: number) => prev + 1);
        if (setOpenIndex) setOpenIndex(null);
        reset();
      })
      .catch((error: any) => {
        setToastNotification(error?.message || 'Failed to update store', 'error');
        setLoading(false);
      });
  };

  // Main submit handler that routes to appropriate function
  const onSubmitHandler = async (data: any) => {
    if (isEditMode) {
      await handleUpdateStore(data);
    } else {
      await handleCreateStore(data);
    }
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
            

            {/* Store Information Section */}
            <div className="mt-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                {isEditMode ? 'Edit Store Information' : 'Create New Store'}
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  type="text"
                  id="store_name"
                  placeholder="Enter Store Name"
                  label="Store Name"
                  error={errors?.store_name?.message}
                  control={control}
                  name="store_name"
                />
                <Input
                  type="text"
                  id="store_code"
                  placeholder="Enter Store Code"
                  label="Store Code"
                  error={errors?.store_code?.message}
                  control={control}
                  name="store_code"
                />
                <Input
                  type="text"
                  id="owner_name"
                  placeholder="Enter Owner Name"
                  label="Owner Name"
                  error={errors?.owner_name?.message}
                  control={control}
                  name="owner_name"
                />
                <Input
                  type="number"
                  id="owner_mobile"
                  placeholder="Enter Owner Mobile"
                  label="Owner Mobile"
                  error={errors?.owner_mobile?.message}
                  control={control}
                  name="owner_mobile"
                />
                <Input
                  type="text"
                  id="address"
                  placeholder="Enter Address"
                  label="Address"
                  error={errors?.address?.message}
                  control={control}
                  name="address"
                />
                <Input
                  type="text"
                  id="city"
                  placeholder="Enter City"
                  label="City"
                  error={errors?.city?.message}
                  control={control}
                  name="city"
                />
                <Input
                  type="text"
                  id="state"
                  placeholder="Enter State"
                  label="State"
                  error={errors?.state?.message}
                  control={control}
                  name="state"
                />
                <Input
                  type="text"
                  id="pincode"
                  placeholder="Enter Pincode"
                  label="Pincode"
                  error={errors?.pincode?.message}
                  control={control}
                  name="pincode"
                />
              </div>
            </div>
            <div className="mb-4 flex justify-end gap-3">
              {!isEditMode && (
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-5 px-12"
                  disabled={loading}
                  type="button"
                  onClick={() => router.push('/agent/merchant')}
                >
                  Cancel
                </Button>
              )}
              <Button
                size="sm"
                variant="primary"
                customBg="bg-brand-500"
                className="mt-5 px-12"
                disabled={loading}
                type="submit"
              >
                {loading ? 'Saving...' : (isEditMode ? 'Update Store' : 'Create Store')}
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
