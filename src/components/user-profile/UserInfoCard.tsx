"use client";
import React, { useContext, useState, useEffect } from "react";
import Button from "../ui/button/Button";
import Input from "../common/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CustomAlertContext } from "@/context/CustomAlertContext";
import { authEndPoints } from "@/helper/ApiEndPoints";
import { apiConnector } from "@/network/Apiconnector";

interface UserProfileData {
  name: string;
  email: string;
  mobile: string;
  role?: string;
}

const ProfileValidation = yup.object().shape({
  name: yup.string().required("Name is required *"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required *"),
  mobile: yup
    .string()
    .required("Mobile is required *")
    .matches(/^[0-9]{10}$/, "Mobile must be exactly 10 digits"),
});

export default function UserInfoCard() {
  const { setToastNotification } = useContext<any>(CustomAlertContext);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userData, setUserData] = useState<UserProfileData | null>(null);

  // Load user data from localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;
    setUserData(parsedUser);
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserProfileData>({
    resolver: yupResolver(ProfileValidation),
    defaultValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      mobile: userData?.mobile || "",
    },
  });

  // Update form when userData changes
  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name || "",
        email: userData.email || "",
        mobile: userData.mobile || "",
      });
    }
  }, [userData, reset]);

  const handleUpdateProfile = async (data: UserProfileData) => {
    setLoading(true);
    await apiConnector({
      method: "PUT",
      url: authEndPoints.UPDATE_PROFILE_API,
      bodyData: data,
    })
      .then((response: any) => {
        setLoading(false);
        setToastNotification(
          response?.data?.message || "Profile updated successfully!",
          "success"
        );
        
        // Update localStorage with new data
        const updatedUser = { ...userData, ...data };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUserData(updatedUser);
        
        // Exit edit mode
        setIsEditMode(false);
      })
      .catch((error: any) => {
        setToastNotification(
          error?.message || "Failed to update profile",
          "error"
        );
        setLoading(false);
      });
  };

  const onSubmitHandler = async (data: UserProfileData) => {
    await handleUpdateProfile(data);
  };

  const handleCancel = () => {
    // Reset form to original values
    reset({
      name: userData?.name || "",
      email: userData?.email || "",
      mobile: userData?.mobile || "",
    });
    setIsEditMode(false);
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

          {!isEditMode ? (
            // Display Mode
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Name
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {userData?.name ?? "--"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Email address
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {userData?.email ?? "--"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Phone
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {userData?.mobile ?? "--"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Role
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {userData?.role ?? "--"}
                </p>
              </div>
            </div>
          ) : (
            // Edit Mode
            <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <Input
                  type="text"
                  id="name"
                  placeholder="Enter Name"
                  label="Name"
                  error={errors?.name?.message}
                  control={control}
                  name="name"
                />
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  label="Email"
                  error={errors?.email?.message}
                  control={control}
                  name="email"
                />
                <Input
                  type="text"
                  id="mobile"
                  placeholder="Enter Mobile"
                  label="Mobile"
                  error={errors?.mobile?.message}
                  control={control}
                  name="mobile"
                />
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Role
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90 mt-3">
                    {userData?.role ?? "--"}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  customBg="bg-brand-500"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Update Profile"}
                </Button>
              </div>
            </form>
          )}
        </div>

        {!isEditMode && (
          <button
            onClick={() => setIsEditMode(true)}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                fill=""
              />
            </svg>
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
