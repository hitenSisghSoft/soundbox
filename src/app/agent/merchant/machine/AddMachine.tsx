import Input from '@/components/common/InputField';
import Button from '@/components/ui/button/Button';
import { CustomAlertContext } from '@/context/CustomAlertContext';
import { machineEndPoints } from '@/helper/ApiEndPoints';
import { apiConnector } from '@/network/Apiconnector';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface MachineFormData {
  id?: string;
  machine_id: string;
  serial_number: string;
  brand: string;
  model: string;
  firmware_version: string;
  hardware_version: string;
  qr_code_url: string;
  upi_id: string;
  merchant_name: string;
  sim_number: string;
  sim_operator: string;
  volume_level: string;
  language: string;
  remarks?: string;
}

const MachineValidation = yup.object().shape({
  machine_id: yup.string().required('Machine ID is required *'),
  serial_number: yup.string().required('Serial Number is required *'),
  brand: yup.string().required('Brand is required *'),
  model: yup.string().required('Model is required *'),
  firmware_version: yup.string().required('Firmware Version is required *'),
  hardware_version: yup.string().required('Hardware Version is required *'),
  qr_code_url: yup.string().url('Must be a valid URL').required('QR Code URL is required *'),
  upi_id: yup.string().required('UPI ID is required *'),
  merchant_name: yup.string().required('Merchant Name is required *'),
  sim_number: yup
    .string()
    .required('SIM Number is required *')
    .matches(/^[0-9]{10}$/, 'SIM Number must be exactly 10 digits'),
  sim_operator: yup.string().required('SIM Operator is required *'),
  volume_level: yup
    .string()
    .required('Volume Level is required *')
    .matches(/^[0-9]+$/, 'Volume Level must be a number'),
  language: yup.string().required('Language is required *'),
  remarks: yup.string(),
});

const AddMachine = ({ 
  item, 
  setMachineApiCall, 
  setOpenIndex, 
  isEditMode = true,
  storeId 
}: { 
  item?: any; 
  setMachineApiCall?: any; 
  setOpenIndex?: any;
  isEditMode?: boolean;
  storeId?: string;
}) => {
  const { setToastNotification } = useContext<any>(CustomAlertContext);
  const [loading, setLoading] = useState(false);
  
  console.log('AddMachine - item:', item);
  console.log('AddMachine - storeId prop:', storeId);
  console.log('AddMachine - isEditMode:', isEditMode);

  const machineId = item?._id;
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(MachineValidation),
    defaultValues: {
      machine_id: item?.machine_id || '',
      serial_number: item?.serial_number || '',
      brand: item?.brand || '',
      model: item?.model || '',
      firmware_version: item?.firmware_version || '',
      hardware_version: item?.hardware_version || '',
      qr_code_url: item?.qr_code_url || '',
      upi_id: item?.upi_id || '',
      merchant_name: item?.merchant_name || '',
      sim_number: item?.sim_number || '',
      sim_operator: item?.sim_operator || '',
      volume_level: item?.volume_level || '',
      language: item?.language || '',
      remarks: item?.remarks || '',
    },
  });

  // Handler for creating a new machine
  const handleCreateMachine = async (data: any) => {
    setLoading(true);
    const payload = {
      ...data,
      assigned_store_id: storeId,
    };
    
    await apiConnector({
      method: 'POST',
      url: `${machineEndPoints?.CREATE_MACHINE_API}`,
      bodyData: payload,
    })
      .then((response: any) => {
        setLoading(false);
        setToastNotification(response?.data?.message || 'Machine created successfully!', 'success');
        reset();
        if (setMachineApiCall) setMachineApiCall((prev: number) => prev + 1);
        if (setOpenIndex) setOpenIndex(null);
      })
      .catch((error: any) => {
        setToastNotification(error?.message || 'Failed to create machine', 'error');
        setLoading(false);
      });
  };

  // Handler for updating an existing machine
  const handleUpdateMachine = async (data: any) => {
    setLoading(true);
    await apiConnector({
      method: 'PUT',
      url: `${machineEndPoints?.UPDATE_MACHINE_API}/${machineId}`,
      bodyData: data,
    })
      .then((response: any) => {
        setLoading(false);
        setToastNotification(response?.data?.message || 'Machine updated successfully!', 'success');
        if (setMachineApiCall) setMachineApiCall((prev: number) => prev + 1);
        if (setOpenIndex) setOpenIndex(null);
        reset();
      })
      .catch((error: any) => {
        setToastNotification(error?.message || 'Failed to update machine', 'error');
        setLoading(false);
      });
  };

  // Main submit handler that routes to appropriate function
  const onSubmitHandler = async (data: any) => {
    if (isEditMode) {
      await handleUpdateMachine(data);
    } else {
      await handleCreateMachine(data);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <form
        onSubmit={(e) => {
          handleSubmit(onSubmitHandler)(e);
        }}
        className="space-y-6"
      >
        {/* Machine Information Section */}
        <div className="mt-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {isEditMode ? 'Edit Machine Information' : 'Create New Machine'}
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              type="text"
              id="machine_id"
              placeholder="Enter Machine ID"
              label="Machine ID"
              error={errors?.machine_id?.message}
              control={control}
              name="machine_id"
            />
            <Input
              type="text"
              id="serial_number"
              placeholder="Enter Serial Number"
              label="Serial Number"
              error={errors?.serial_number?.message}
              control={control}
              name="serial_number"
            />
            <Input
              type="text"
              id="brand"
              placeholder="Enter Brand"
              label="Brand"
              error={errors?.brand?.message}
              control={control}
              name="brand"
            />
            <Input
              type="text"
              id="model"
              placeholder="Enter Model"
              label="Model"
              error={errors?.model?.message}
              control={control}
              name="model"
            />
            <Input
              type="text"
              id="firmware_version"
              placeholder="Enter Firmware Version"
              label="Firmware Version"
              error={errors?.firmware_version?.message}
              control={control}
              name="firmware_version"
            />
            <Input
              type="text"
              id="hardware_version"
              placeholder="Enter Hardware Version"
              label="Hardware Version"
              error={errors?.hardware_version?.message}
              control={control}
              name="hardware_version"
            />
            <Input
              type="text"
              id="qr_code_url"
              placeholder="Enter QR Code URL"
              label="QR Code URL"
              error={errors?.qr_code_url?.message}
              control={control}
              name="qr_code_url"
            />
            <Input
              type="text"
              id="upi_id"
              placeholder="Enter UPI ID"
              label="UPI ID"
              error={errors?.upi_id?.message}
              control={control}
              name="upi_id"
            />
            <Input
              type="text"
              id="merchant_name"
              placeholder="Enter Merchant Name"
              label="Merchant Name"
              error={errors?.merchant_name?.message}
              control={control}
              name="merchant_name"
            />
            <Input
              type="text"
              id="sim_number"
              placeholder="Enter SIM Number"
              label="SIM Number"
              error={errors?.sim_number?.message}
              control={control}
              name="sim_number"
            />
            <Input
              type="text"
              id="sim_operator"
              placeholder="Enter SIM Operator"
              label="SIM Operator"
              error={errors?.sim_operator?.message}
              control={control}
              name="sim_operator"
            />
            <Input
              type="text"
              id="volume_level"
              placeholder="Enter Volume Level"
              label="Volume Level"
              error={errors?.volume_level?.message}
              control={control}
              name="volume_level"
            />
            <Input
              type="text"
              id="language"
              placeholder="Enter Language"
              label="Language"
              error={errors?.language?.message}
              control={control}
              name="language"
            />
            <Input
              type="text"
              id="remarks"
              placeholder="Enter Remarks (Optional)"
              label="Remarks"
              error={errors?.remarks?.message}
              control={control}
              name="remarks"
            />
          </div>
        </div>
        <div className="mb-4 flex justify-end gap-3">
          <Button
            size="sm"
            variant="primary"
            customBg="bg-brand-500"
            className="mt-5 px-12"
            disabled={loading}
            type="submit"
          >
            {loading ? 'Saving...' : (isEditMode ? 'Update Machine' : 'Create Machine')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddMachine;
