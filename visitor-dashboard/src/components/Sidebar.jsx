import React from 'react';
import { Home, Mail, Users, Shield, Settings, Menu } from 'lucide-react';
import visitordeskicon from "../assets/visitor-desk-icon.svg";
import visitordesktext from "../assets/text.svg";
import { ChevronLeft, ChevronRight } from 'lucide-react';  // or ArrowLeft/ArrowRight
import { CircleChevronLeft, CircleChevronRight } from 'lucide-react'; // circled arrows

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <>
      {/* Top-right toggle */}
      

      {/* Sidebar container */}
     <div
  className={
    `sidebar relative top-0 left-0 h-full bg-gray-900 text-white transition-all duration-300 ` +
    `${isSidebarOpen ? 'w-56' : 'w-16'} ` +
    `${isSidebarOpen ? 'open' : 'hidden-mobile'}`
  }
  style={{ overflow: 'visible' }}  // allow the button to protrude
>
  {/* Toggle pinned to the sidebar’s right edge */}
 <button
  onClick={toggleSidebar}
  aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
  title={isSidebarOpen ? 'Collapse' : 'Expand'}
  style={{
    position: 'absolute',
    top: '5%',
    right: 0,
    transform: 'translate(50%, -50%)',  // half outside horizontally, centered vertically
    zIndex: 1001,
    width: 35,
    height: 35,
    borderRadius: '50%',                 // solid circle
    background: '#ffffffff',              // pick your brand color
    color: '#4c1ef2ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
    border: 'none',                      // no stroke ring
  }}
>
  {isSidebarOpen ? <ChevronLeft size={30} /> : <ChevronRight size={30} />}
</button>

  {/* Logo (add padding-top so the button doesn't overlap) */}
  <div className="logo flex items-center justify-center mb-10 px-3 pt-10">
    <img
      src={visitordeskicon}
      alt="Visitordesk icon"
      className={`shrink-0 transition-all max-w-[3rem] ${isSidebarOpen ? 'h-8 w-auto' : 'h-8 w-auto'}`}
      title="Visitordesk"
    />
    <img
      src={visitordesktext}
      alt="Visitordesk text"
      className={`transition-all ${isSidebarOpen ? 'block h-10 w-auto max-w-[9rem]' : 'hidden'}`}
      style={{ marginLeft: '12px' }}
    />
  </div>





        {/* Nav */}
        <nav className="flex-1">
          <ul className="space-y-2 px-2">
            <li
              className={`nav-item flex items-center gap-3 px-3 py-2 rounded-md bg-blue-600/20 active`}
              title="Dashboard"
            >
              <Home size={20} className="shrink-0"/>
              <span className={isSidebarOpen ? 'block' : 'hidden'}>Dashboard</span>
            </li>

            <li
              className="nav-item flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10"
              title="Inbox"
            >
              <Mail size={20} className="shrink-0"/>
              <span className={isSidebarOpen ? 'block' : 'hidden'}>Inbox</span>
            </li>

            <li
              className="nav-item flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10"
              title="Manage Visitors"
            >
              <Users size={20} className="shrink-0"/>
              <span className={isSidebarOpen ? 'block' : 'hidden'}>Manage Visitors</span>
            </li>

            <li
              className="nav-item flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10"
              title="Security"
            >
              <Shield size={20} className="shrink-0"/>
              <span className={isSidebarOpen ? 'block' : 'hidden'}>Security</span>
            </li>
          </ul>
        </nav>

        {/* Settings at bottom */}
        <div className="mt-auto px-2 pb-4">
          <div
            className="nav-item flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10"
            title="Settings"
          >
            <Settings size={20} className="shrink-0"/>
            <span className={isSidebarOpen ? 'block' : 'hidden'}>Settings</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
