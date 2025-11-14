// FILE: src/components/common/CustomToast.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'react-feather';
import toast from 'react-hot-toast';

const toastVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0 },
};

const CustomToast = ({ t, type, message }) => {
  const isSuccess = type === 'success';

  return (
    <motion.div
      variants={toastVariants}
      initial="hidden"
      animate={t.visible ? "visible" : "exit"}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative w-full max-w-md p-6 rounded-xl shadow-2xl flex items-start space-x-4 ${
        isSuccess ? 'bg-green-500' : 'bg-red-500'
      } text-white`}
    >
      <div className="flex-shrink-0">
        {isSuccess ? <CheckCircle size={28} /> : <XCircle size={28} />}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-lg">{isSuccess ? 'Success!' : 'Error!'}</h3>
        <p className="text-sm opacity-90">{message}</p>
      </div>
      <button 
        onClick={() => toast.dismiss(t.id)}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/20 transition-colors"
      >
        <X size={18} />
      </button>
    </motion.div>
  );
};

export default CustomToast;