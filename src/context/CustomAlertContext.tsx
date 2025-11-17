import  { createContext, ReactNode } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CustomAlertContextType {
  setToastNotification: (message?: string, type?: "success" | "error" | "info" | "warning") => void;
}

const defaultContextValue: CustomAlertContextType = {
  setToastNotification: () => {}, // empty function to avoid errors before Provider loads
};

export const CustomAlertContext = createContext<CustomAlertContextType>(defaultContextValue);

interface Props {
  children?: ReactNode;
}
export const CustomAlertContextProvider = ({ children }:Props) => {

  const setToastNotification = (message = "", type: "success" | "error" | "info" | "warning" = "success") => {
    toast[type](message);
  };

  return (
    <CustomAlertContext.Provider value={{ setToastNotification }}>
      <ToastContainer
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {children}
    </CustomAlertContext.Provider>
  );
};
