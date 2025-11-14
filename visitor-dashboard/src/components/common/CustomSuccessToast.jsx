// FILE: src/components/common/CustomSuccessToast.jsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import success from "../../assets/Success.json";

const CustomSuccessToast = ({ isOpen, message, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50 font-sans backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="bg-white rounded-2xl shadow-3xl w-full max-w-sm text-center p-8 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="scale-150">
              <Player
                autoplay
                loop={false}
                keepLastFrame
                src={success}
                style={{ height: '150px', width: '150px' }}
              />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mt-4">Success!</h2>
            <p className="text-gray-600 mt-2 text-base">{message}</p>
            
            <button
              onClick={onClose}
              className="mt-8 w-full bg-gradient-success text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              OK
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomSuccessToast;