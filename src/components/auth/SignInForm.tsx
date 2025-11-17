"use client";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import * as yup from "yup";
import {  yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import Link from "next/link";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { authEndPoints } from "@/helper/ApiEndPoints";
import { CustomAlertContext } from "@/context/CustomAlertContext";
import { apiConnector } from "@/network/Apiconnector";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/slice/authSlice";


const SignInValidation = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email is required *"),
  password: yup.string().required("Password is required *"),
});
export default function SignInForm() {
const router = useRouter();
  const dispatch = useDispatch();

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
        method: "POST",
        url: authEndPoints?.LOGIN_API,
        bodyData: formData,
      }).then((response:any) => {
        setLoading(false);
        console.log(response?.data?.data,"response");
        
    dispatch(setToken(response?.data?.token));
    localStorage.setItem("user", JSON.stringify(response?.data?.data));
    router.push("/"); 


      }).catch((error:any) => {
        setToastNotification(error?.message, "error");
        setLoading(false);
      })
  }
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div className="space-y-4">
                      
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
            >
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
                  <Button className="w-full" size="sm"
                disabled={loading}
                type="submit"
                  >
                    Sign in
                  </Button>
                </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
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
