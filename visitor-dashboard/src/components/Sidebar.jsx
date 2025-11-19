import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import {
  Home,
  Users,
  Shield,
  Settings,
  ChevronLeft,
  ChevronRight,
  QrCode,
} from "lucide-react";

import visitordeskicon from "../assets/visitor-desk-icon.svg";
import visitordesktext from "../assets/text.svg";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);   // ⬅️ GET LOGGED-IN USER

  const role = user?.role || "";              // HOST / SECURITY / ADMIN
  const isHost = role === "host";

const isSecurity = role === "security";
const isSecurityModule =
  isSecurity &&
  (location.pathname.startsWith("/security") ||
    location.pathname === "/scan-pass" ||
    location.pathname === "/settings"); // keep menu on settings


  return (
    <div
      className={`sidebar ${
        isSidebarOpen ? "open w-56" : "hidden-mobile w-16"
      }`}
      aria-label="Main sidebar"
    >
      {/* Sidebar Toggle */}
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
          borderRadius: 50,
          background: "#ffffff",
          color: "#325CF3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
          border: "none",
          cursor: "pointer",
          paddingRight: 10
        }}
        type="button"
      >
        {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Logo */}
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
          {/* SECURITY MODULE */}
          {isSecurityModule && (
            <>
              <li>
                <NavLink
                  to="/security/dashboard"
                  className={({ isActive }) =>
                    `nav-item${isActive ? " active" : ""}`
                  }
                >
                  <Shield size={20} className="shrink-0" />
                  <span className={isSidebarOpen ? "label" : "label hidden"}>
                    Security
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/security/scan-pass"
                  className={({ isActive }) =>
                    `nav-item${isActive ? " active" : ""}`
                  }
                >
                  <QrCode size={20} className="shrink-0" />
                  <span className={isSidebarOpen ? "label" : "label hidden"}>
                    Scan Pass
                  </span>
                </NavLink>
              </li>
            </>
          )}

          {/* HOST MENU */}
          {!isSecurityModule && isHost && (
            <>
              <li>
                <NavLink
                  to="/host/dashboard"
                  className={({ isActive }) =>
                    `nav-item${isActive ? " active" : ""}`
                  }
                >
                  <Home size={20} className="shrink-0" />
                  <span className={isSidebarOpen ? "label" : "label hidden"}>
                    Dashboard
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/host/manage-visitors"
                  className={({ isActive }) =>
                    `nav-item${isActive ? " active" : ""}`
                  }
                >
                  <Users size={20} className="shrink-0" />
                  <span className={isSidebarOpen ? "label" : "label hidden"}>
                    Manage Visitors
                  </span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* SETTINGS — visible for ALL logged-in users */}
      <div className="mt-auto p-0 pb-4">
        
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `nav-item ${isActive ? " active" : ""}`
          }
        >
          <div className="flex items-center ">
  <Settings size={20} className="shrink-0" />
  <span className={isSidebarOpen ? "label" : "label hidden"}>
    Settings
  </span>
</div>
        </NavLink>
        
      </div>
    </div>
  );
};

export default Sidebar;
