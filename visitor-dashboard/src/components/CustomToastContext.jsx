// FILE: src/components/context/CustomToastContext.jsx
// (This file is located at src/components/context/CustomToastContext.jsx)

import React, { createContext, useState, useContext } from "react";

// --- THIS IS THE FIX ---
// The path was "../components/common/..." which was wrong.
// It must be "../common/..." because you are going from:
// src/components/context/ -> UP to src/components/ -> DOWN to src/components/common/
import CustomSuccessToast from "../common/CustomSuccessToast";
import CustomErrorToast from "../common/CustomErrorToast.jsx";
// --- END OF FIX ---

const CustomToastContext = createContext();

export const useCustomToast = () => {
  return useContext(CustomToastContext);
};

export const CustomToastProvider = ({ children }) => {
  const [toastState, setToastState] = useState({
    isOpen: false,
    message: "",
    type: "success", 
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

      {/* This part renders your toast components */}
      {/* It will show one or the other based on the 'type' in the state */}
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