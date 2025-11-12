// FILE: src/components/common/Spinner.js
import React from 'react';

const Spinner = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };
  return (
    <div
      className={`animate-spin rounded-full border-t-2 border-b-2 border-white ${sizes[size]}`}
    ></div>
  );
};

export default Spinner;