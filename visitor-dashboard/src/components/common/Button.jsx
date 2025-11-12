// FILE: src/components/common/Button.js
import React from 'react';
import Spinner from './Spinner';

const Button = ({ children, isLoading, variant = 'primary', className = '', ...props }) => {
  const baseClasses = "w-full p-3 rounded-lg font-semibold mt-4 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: 'bg-primary-blue text-white hover:bg-opacity-90',
    secondary: 'bg-gray-200 text-text-primary hover:bg-gray-300',
    danger: 'bg-error text-white hover:bg-opacity-90',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Spinner size="sm" /> : children}
    </button>
  );
};

export default Button;  