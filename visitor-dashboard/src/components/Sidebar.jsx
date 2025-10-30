import React from "react";
import { Home, Mail, Users, Shield, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import visitordeskicon from "../assets/visitor-desk-icon.svg";
import visitordesktext from "../assets/text.svg";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div
      className={`sidebar ${isSidebarOpen ? "open w-56" : "hidden-mobile w-16"}`}
      aria-label="Main sidebar"
    >
      {/* Desktop edge toggle remains */}
      <button
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        title={isSidebarOpen ? "Collapse" : "Expand"}
        style={{
          position: "absolute",
          top: "5rem",
          right: 0,
          transform: "translate(50%, -50%)",
          zIndex: 1001,
          width: 35,
          height: 35,
          paddingRight:5,
          borderRadius: 50,
          background: "#ffffff",
          color: "#325CF3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
          border: "none",
          cursor: "pointer"
        }}
        type="button"
      >
        {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      <div className="logo flex items-center justify-center mb-10 px-3 pt-10">
        <img
          src={visitordeskicon}
          alt="Visitordesk icon"
          className="shrink-0"
          style={{ height: "32px", width: "auto" }}
        />
        <img
          src={visitordesktext}
          alt="Visitordesk"
          className={isSidebarOpen ? "block" : "hidden"}
          style={{ height: "36px", width: "auto", marginLeft: "12px" }}
        />
      </div>

      <nav className="flex-1" aria-label="Primary">
        <ul className="space-y-2 px-2">
          <li>
            <NavLink to="/" end style={{ textDecoration: "none" }} className={({ isActive }) => `nav-item${isActive ? " active" : ""}`} title="Dashboard">
              <Home size={20} className="shrink-0" />
              <span className={isSidebarOpen ? "label" : "label hidden"}>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/inbox" style={{ textDecoration: "none" }} className={({ isActive }) => `nav-item${isActive ? " active" : ""}`} title="Inbox">
              <Mail size={20} className="shrink-0" />
              <span className={isSidebarOpen ? "label" : "label hidden"}>Inbox</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/manage-visitors" style={{ textDecoration: "none" }} className={({ isActive }) => `nav-item${isActive ? " active" : ""}`} title="Manage Visitors">
              <Users size={20} className="shrink-0" />
              <span className={isSidebarOpen ? "label" : "label hidden"}>Manage Visitors</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/security" style={{ textDecoration: "none" }} className={({ isActive }) => `nav-item${isActive ? " active" : ""}`} title="Security">
              <Shield size={20} className="shrink-0" />
              <span className={isSidebarOpen ? "label" : "label hidden"}>Security</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="mt-auto px-2 pb-4">
        <NavLink to="/settings" style={{ textDecoration: "none" }} className={({ isActive }) => `nav-item${isActive ? " active" : ""}`} title="Settings">
          <Settings size={20} className="shrink-0" />
          <span className={isSidebarOpen ? "label" : "label hidden"}>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
