// FILE: src/pages/Unauthorized.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ShieldOff } from 'react-feather';

const Unauthorized = () => {
    const { user } = useAuth();

    // This helper function determines the user's correct "home" or dashboard path.
    const getDashboardPath = () => {
        // If there's no user at all, send them to the login page.
        if (!user) return '/login';

        // Based on the user's role, return the path to their main dashboard.
        switch(user.role) {
            case 'admin': return '/admin/dashboard';
            case 'host': return '/host/dashboard';
            case 'security': return '/security/dashboard';
            default: return '/login'; // Fallback to login if role is unknown
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-background">
          <ShieldOff className="text-error mb-4" size={64}/>
          
          <h1 className="text-4xl font-bold text-error">403 - Access Denied</h1>
          
          <p className="text-text-secondary mt-4 max-w-md">
              Sorry, you do not have the necessary permissions to access this page. 
              Your current role is '{user?.role || 'Guest'}' and this resource is protected.
          </p>

          <Link to={getDashboardPath()}>
            <button className="bg-primary-blue text-white p-3 rounded-lg font-semibold mt-8 hover:bg-opacity-90 transition-colors">
                Return to Your Dashboard
            </button>
          </Link>
        </div>
    );
};

export default Unauthorized;