'use client';

import ComponentCard from '@/components/common/ComponentCard';
import Input from '@/components/form/input/InputField';
import Select from '@/components/form/Select';
import Button from '@/components/ui/button/Button';
import { CustomAlertContext } from '@/context/CustomAlertContext';
import { employeeEndPoints } from '@/helper/ApiEndPoints';
import { apiConnector } from '@/network/Apiconnector';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface EmployeeFormProps {
  mode: string;
  data: any;
}
const rolesOption = [
  { value: 'agent', label: 'Agent' },
  { value: 'operations', label: 'Operations' },
  { value: 'support', label: 'Support' },
];
const shiftOption = [
  { value: 'morning', label: 'Morning' },
  { value: 'evening', label: 'Evening' },
  { value: 'night', label: 'Night' },
];
const EmployeeValidation = yup.object().shape({
  name: yup.string().required('Name is required *'),
  email: yup.string().email('Invalid Email').required('Email is required *'),
  mobile: yup
    .string()
    .required('Mobile is required *')
    .max(10, "Mobile number can't be more than 10 digits")
    .min(10, 'Mobile number must be at least 10 digits'),
  shift: yup.string().required('Shift is required *').trim(),
  role: yup.string().required('Role is required *').trim(),
});
const EmployeeForm: React.FC<EmployeeFormProps> = ({ mode = 'add', data }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const addForm = mode === 'add' ? true : false;
  const { setToastNotification } = useContext(CustomAlertContext);

  type EmployeeFormInterface = yup.InferType<typeof EmployeeValidation>;

  const AddEmployeeApi = async (data: any) => {
    await apiConnector({
      method: 'POST',
      url: employeeEndPoints?.CREATE_Employee_API,
      bodyData: data,
    })
      .then((response: any) => {
        setLoading(false);
        setToastNotification(response?.data?.message, 'success');

        reset();
        router.push('/employee');
      })
      .catch((error: any) => {
        setToastNotification(error?.message, 'error');
        setLoading(false);
      });
  };

  const UpdateUserApi = async (formData: any) => {
    await apiConnector({
      method: 'PUT',
      url: `${employeeEndPoints?.UPDATE_Employee_API}/${data?._id}`,
      bodyData: formData,
    })
      .then((response: any) => {
        setLoading(false);
        setToastNotification(response?.data?.message, 'success');
        router.push('/employee');

        reset();
      })
      .catch((error: any) => {
        setToastNotification(error?.message, 'error');
        setLoading(false);
      });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeFormInterface>({
    resolver: yupResolver(EmployeeValidation),
    defaultValues: {
      name: data ? data?.name : '',
      email: data ? data?.email : '',
      mobile: data ? data?.mobile : '',
      shift: data ? data?.shift : '',
      role: data ? data?.role : '',
    },
  });

  const onSubmitHandler = (data: any) => {
    if (addForm) {
      AddEmployeeApi(data);
    } else {
      UpdateUserApi(data);
    }
  };

  return (
    <>
      {/* <PageBreadcrumb pageTitle="Employee Form" /> */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-10">
        <div className="col-span-1 md:col-span-10 lg:col-span-12">
          <ComponentCard title="Employee Form">
            <div className="mx-6 space-y-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(onSubmitHandler)(e);
                }}
                //   onSubmit={handleSubmit(onSubmitHandler)}
                // className="w-full px-6 py-6"
                // noValidate
              >
                <h2 className="mb-2 text-white">Add User</h2>
                <Input
                  type="text"
                  id="input"
                  placeholder="Enter Name here"
                  label="Name"
                  error={errors?.name?.message}
                  control={control}
                  name="name"
                />
                <Input
                  type="text"
                  id="input"
                  placeholder="Enter Email here"
                  name="email"
                  label="Email"
                  error={errors?.email?.message}
                  control={control}
                />
                <Input
                  type="number"
                  id="input"
                  placeholder="Enter Mobile here"
                  name="mobile"
                  label="Mobile"
                  error={errors?.mobile?.message}
                  control={control}
                />
                <Select
                  error={errors?.role?.message}
                  label="Employee shift"
                  options={shiftOption}
                  placeholder="Select shift"
                  control={control}
                  name="shift"
                  className="dark:bg-dark-900"
                />
                <Select
                  error={errors?.role?.message}
                  label="Employee Role"
                  options={rolesOption}
                  placeholder="Select role"
                  control={control}
                  name="role"
                  className="dark:bg-dark-900"
                />
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
      </div>
    </>
  );
};

export default EmployeeForm;
