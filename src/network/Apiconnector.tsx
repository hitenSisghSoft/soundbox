import axios from "axios";
import { ApiError } from "../helper/ApiError";
import { toast } from "react-toastify";
import { setToken, setUser } from "@/redux/slice/authSlice";
import { store } from "@/app/layout";

export const axiosInstance: any = axios.create({});

interface ApiConnectorInterface {
  method: string;
  url: string;
  bodyData?: any;
  headers?: Record<string, string>;
  params?: Record<string, any>;
}
export const apiConnector = ({
  method,
  url,
  bodyData,
  headers,
  params,
}: ApiConnectorInterface) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config: any) {
    // const token = localStorage.getItem("userToken");
    const { token } = store.getState().auth;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response: any) {
    return response;
  },
  function (error: any) {
    if (error.response && error.response.status === 401) {
      store.dispatch(setToken(null));
      store.dispatch(setUser(null));
      toast.error(error?.response?.data?.message);

      window.location.href = "/signin";
      return new Promise(() => {});
    }
    const errorMessage = ApiError(error);
    return Promise.reject(errorMessage);
  }
);
