'use client';
import Input from '@/components/form/input/InputField';
import Button from '@/components/ui/button/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';

import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { authEndPoints } from '@/helper/ApiEndPoints';
import { CustomAlertContext } from '@/context/CustomAlertContext';
import { apiConnector } from '@/network/Apiconnector';
import { useDispatch } from 'react-redux';
import { setToken } from '@/redux/slice/authSlice';
import { useRole } from '@/context/RoleContext';
// import { UserRole } from '@/types/roles';

const SignInValidation = yup.object().shape({
  email: yup.string().email('Invalid Email').required('Email is required *'),
  password: yup.string().required('Password is required *'),
});
export default function SignInForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { setRole } = useRole();

  const [loading, setLoading] = useState(false);
  const { setToastNotification } = useContext<any>(CustomAlertContext);

  type userFormInterface = yup.InferType<typeof SignInValidation>;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<userFormInterface>({
    resolver: yupResolver(SignInValidation),
  });

  // console.log(errors,"errors");

  const onSubmitHandler = async (formData: any) => {
    setLoading(true);

    await apiConnector({
      method: 'POST',
      url: authEndPoints?.LOGIN_API,
      bodyData: formData,
    })
      .then((response: any) => {
        setLoading(false);

        dispatch(setToken(response?.data?.token));

        // Set user role from API response
        const userRole = response?.data?.data?.role;
        console.log(userRole, 'userRole');

        if (userRole) {
          setRole(userRole);
        }

        localStorage.setItem('user', JSON.stringify(response?.data?.data));
        router.push('/');
      })
      .catch((error: any) => {
        setToastNotification(error?.message, 'error');
        setLoading(false);
      });
  };
  return (
    <div className="flex w-full flex-1 flex-col lg:w-1/2">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="text-title-sm sm:text-title-md mb-2 font-semibold text-gray-800 dark:text-white/90">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div className="space-y-4">
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="space-y-6">
                <Input
                  type="text"
                  id="input"
                  placeholder="name@domain.com"
                  name="email"
                  label="Email"
                  error={errors?.email?.message}
                  control={control}
                />
              </div>
              {/* <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div> */}
              {/* <div className="space-y-6"> */}
              <Input
                type="text"
                id="input"
                placeholder="Password"
                name="password"
                label="Password"
                error={errors?.password?.message}
                control={control}
              />
              {/* </div> */}
              {/* </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    href="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <Button className="w-full" size="sm">
                    Sign in
                  </Button>
                </div>
              </div> */}
              <div>
                <Button className="w-full" size="sm" disabled={loading} type="submit">
                  Sign in
                </Button>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-center text-sm font-normal text-gray-700 sm:text-start dark:text-gray-400">
                Don&apos;t have an account? {''}
                <Link
                  href="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
