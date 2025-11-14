// FILE: src/contexts/CustomToastContext.jsx
import React, { createContext, useState, useContext } from "react";
import CustomSuccessToast from "../components/common/CustomSuccessToast";
import CustomErrorToast from "../components/common/CustomErrorToast";

const CustomToastContext = createContext();

export const useCustomToast = () => {
  return useContext(CustomToastContext);
};

export const CustomToastProvider = ({ children }) => {
  const [toastState, setToastState] = useState({
    isOpen: false,
    message: "",
    type: "success", // 👈 add type
  });

  const showSuccessToast = (message) => {
    setToastState({ isOpen: true, message, type: "success" });
  };

  const showErrorToast = (message) => {
    setToastState({ isOpen: true, message, type: "error" });
  };

  const hideToast = () => {
    setToastState({ isOpen: false, message: "", type: "success" });
  };

  return (
    <CustomToastContext.Provider value={{ showSuccessToast, showErrorToast }}>
      {children}

      {toastState.type === "success" ? (
        <CustomSuccessToast
          isOpen={toastState.isOpen}
          message={toastState.message}
          onClose={hideToast}
        />
      ) : (
        <CustomErrorToast
          isOpen={toastState.isOpen}
          message={toastState.message}
          onClose={hideToast}
        />
      )}
    </CustomToastContext.Provider>
  );
};
