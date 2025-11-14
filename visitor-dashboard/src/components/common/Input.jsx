// // FILE: src/components/common/Input.js
// import React from 'react';

// const Input = ({ label, name, ...props }) => {
//   return (
//     <div>
//       {label && <label htmlFor={name} className="block font-semibold text-text-primary mb-2">{label}</label>}
//       <input
//         id={name}
//         name={name}
//         className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-shadow"
//         {...props}
//       />
//     </div>
//   );
// };

// export default Input;




// FILE: src/components/common/Input.js
// FILE: src/components/common/Input.jsx

   import React, { useState } from 'react';
import { Eye, EyeOff } from 'react-feather';


const Input = ({ label, name, small, type, icon, ...props }) => {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Determine if the input is a password field
  const isPasswordInput = type === 'password';

  // Conditionally set the input type based on the showPassword state
  const inputType = isPasswordInput ? (showPassword ? 'text' : 'password') : type;

  // Base and conditional classes for styling
  const baseClasses = "w-full border-2 border-estmac-blue-100 rounded-lg bg-gray-50 focus:outline-none focus:border-estmac-blue-300 focus:ring-2 focus:ring-estmac-blue-300 transition-all";
  const sizeClass = small ? "p-2 text-sm" : "p-3";
  const iconPaddingClass = icon ? "pl-10" : "";
  const eyeIconPaddingClass = isPasswordInput ? "pr-10" : "";

  return (
    <div className="relative">
      {label && <label htmlFor={name} className="block font-semibold text-estmac-blue-900 mb-2">{label}</label>}
      
      {/* Icon on the left side */}
      {icon && (
        <div className="absolute inset-y-0 left-0 top-6 flex items-center pl-3 pointer-events-none">
          {React.createElement(icon, { size: 20, className: "text-gray-400" })}
        </div>
      )}

      <input
        id={name}
        name={name}
        type={inputType}
        className={`${baseClasses} ${sizeClass} ${iconPaddingClass} ${eyeIconPaddingClass}`}
        {...props}
      />
      
      {/* Eye icon button for password inputs */}
      {isPasswordInput && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      )}
    </div>
  );
};

export default Input;