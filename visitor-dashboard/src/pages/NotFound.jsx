// FILE: src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-6xl font-bold text-primary-blue">404</h1>
      <h2 className="text-3xl font-semibold text-text-primary mt-4">Page Not Found</h2>
      <p className="text-text-secondary mt-2">Sorry, the page you are looking for does not exist.</p>
      <Link to="/login">
        <button className="bg-primary-blue text-white p-3 rounded-lg font-semibold mt-6 hover:bg-opacity-90">
            Go to Login
        </button>
      </Link>
    </div>
  );
};

export default NotFound;