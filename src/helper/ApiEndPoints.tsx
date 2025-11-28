const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const authEndPoints = {
  LOGIN_API: `${BASE_URL}users/login`,
};

export const employeeEndPoints = {
  GET_Employee_API: `${BASE_URL}users/admin/all_users`,
  GET_Employee_By_ID_API: `${BASE_URL}users/admin/user`,
  UPDATE_Employee_API: `${BASE_URL}users/admin/update_user`,
  CREATE_Employee_API: `${BASE_URL}users/admin/create_user`,
  DELETE_Employee_API: `${BASE_URL}users/admin/delete_user`,
};

export const merchantEndPoints = {
  GET_MERCHANT_By_NUMBER_API: `${BASE_URL}merchants/search/mobile?mobile_number=`,
  GET_MERCHANT_By_ID_API: `${BASE_URL}merchants`,
  CREATE_MERCHANT_API: `${BASE_URL}merchants/add`,
  UPDATE_MERCHANT_API: `${BASE_URL}merchants/update`,
  DELETE_MERCHANT_API: `${BASE_URL}merchant/delete`,
  GET_ALL_MERCHANTS_API: `${BASE_URL}merchant/list`,
  GET_MERCHANT_STORES_API: `${BASE_URL}merchants/stores`,
  CREATE_MERCHANT_STORES_API: `${BASE_URL}stores/create`,
  UPDATE_MERCHANT_STORES_API: `${BASE_URL}stores`,
};

export const machineEndPoints = {
  GET_MACHINE_By_ID_API: `${BASE_URL}Machines/store`,
  GET_ALL_MACHINE_API: `${BASE_URL}Machines`,
  CREATE_MACHINE_API: `${BASE_URL}Machines`,
  UPDATE_MACHINE_API: `${BASE_URL}Machines`,
};