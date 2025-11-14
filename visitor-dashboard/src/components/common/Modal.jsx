// 


// FILE: src/components/common/Modal.js
import React from 'react';
import { X } from 'react-feather';
import Card from './Card';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex justify-center shadow-soft items-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <Card className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="flex justify-between items-center px-6 pt-4 pb-4 border-b-2 border-estmac-blue-100">
            <h2 className="text-xl font-bold text-estmac-blue-900">{title}</h2>
            <button
              onClick={onClose}
              className="bg-estmac-red-500 text-white p-2 rounded-full transition-all 
                         hover:bg-estmac-red-600 focus:outline-none focus:ring-2 focus:ring-estmac-red-400"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>

          {/* Body - removed fixed max-height + scrollbar */}
          <div className="bg-white p-6">
            {children}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Modal;
