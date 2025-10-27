import React from 'react';
import { Home, Mail, Users, Shield, Settings, Menu } from 'lucide-react';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {

  return (
    <>
      <button className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white" onClick={toggleSidebar}>
        <Menu size={24} />
      </button>
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'hidden-mobile'} md:relative`}>
        <div className="logo flex items-center justify-center gap-2 mb-10 text-white">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gauge">
            <path d="M12 14v4"/>
            <path d="M3.34 19.06a8.5 8.5 0 0 0 14.37 2.14L21 16"/>
            <path d="M2.28 6.93l1.83 1.83"/>
            <path d="M6.39 3.43l-.55 1.76"/>
            <path d="M10.26 2.12L12 4"/>
            <path d="M16.95 2.27l-.93 1.8"/>
            <path d="M21.07 6.09l-1.83 1.83"/>
            <path d="M22 12h-2"/>
          </svg>
          ESTMAC
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li className="nav-item active">
              <Home size={20} />
              <span>Dashboard</span>
            </li>
            <li className="nav-item">
              <Mail size={20} />
              <span>Inbox</span>
            </li>
            <li className="nav-item">
              <Users size={20} />
              <span>Manage Visitors</span>
            </li>
            <li className="nav-item">
              <Shield size={20} />
              <span>Security</span>
            </li>
          </ul>
        </nav>
        <div className="settings nav-item">
          <Settings size={20} />
          <span>Settings</span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
