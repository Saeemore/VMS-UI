// FILE: src/components/common/CustomSuccessToast.jsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player'; // <-- 1. Import the Lottie Player

import errora from "../../assets/error.json" 
const CustomErrorToast = ({ isOpen, message, onClose }) => {
  console.log("a")
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50 font-sans"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm text-center p-8 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* --- 2. Lottie Animation Player --- */}
            <div className="scale-100">
            <Player
              autoplay
              loop={false} // Animation will play only once
              keepLastFrame
              src={errora} // A high-quality public animation
              style={{ height: '150px', width: '150px' }}
            />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mt-4">Error!</h2>
            <p className="text-gray-600 mt-2 text-base">{message}</p>
            
            <button
              onClick={onClose}
              className="mt-8 w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              OK
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomErrorToast;