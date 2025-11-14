// FILE: src/components/common/Card.js
import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-card p-6 sm:p-8 rounded-xl shadow-md w-full ${className}`}>
      {children}
    </div>
  );
};

export default Card;