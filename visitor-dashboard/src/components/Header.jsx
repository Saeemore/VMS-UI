// src/components/Header.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import { useDrawer } from "../hooks/useDrawer";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react"; // <--- Added useState here
import { useNavigate } from "react-router-dom"; 

const Header = ({
  onSearch,
  onToggleSidebar,
  showSearch = false,
  pageTitle,
  pageSubtitle,
  hostName = "John", 
}) => {
  // --- ADDED THESE DEFINITIONS TO FIX THE ERRORS ---
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  // ------------------------------------------------

  const { pathname } = useLocation();
  const { open } = useDrawer();
  // const {navigate} =useNavigate();
  const isHost = pathname.startsWith("/host") || pathname.startsWith("/security");
  const isHostDashboard = pathname === "/host/dashboard" || pathname === "/security/dashboard";
  const { user, logout } = useContext(AuthContext); 

  if (!user) {
    return null; // prevents crash on refresh
  }

  // Determine title  
  let title = pageTitle;
  let subtitle = pageSubtitle;

  if (!pageTitle) {
    if (isHostDashboard) {
      title = `Hello, ${(user.name).split(" ")[0]}`;
      subtitle = "Here’s your visitors summary";
    } else if (isHost) {
      // For all other /host/... routes
      title = routeToTitle(pathname.replace("/host/", ""));
      subtitle = "";
    } else {
      // Normal sections (non-host)
      title = routeToTitle(pathname);
      subtitle = "";
    }
  }

  return (
    <header className="vd-header">
      <button
        type="button"
        className="vd-hamburger"
        aria-label="Open sidebar"
        onClick={onToggleSidebar}
      >
        <span /><span /><span />
      </button>

      <div className="vd-greeting">
        <h1 className="vd-title">{title}</h1>
        {subtitle ? <p className="vd-subtitle">{subtitle}</p> : null}
      </div>

      {showSearch ? (
        <div className="vd-search">
          <svg
            className="vd-search-icon"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            className="vd-search-input"
            placeholder="Search anything…"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
      ) : (
        <div />
      )}

      <div className="vd-actions">
        <button
          className="vd-bell"
          type="button"
          aria-label="Notifications"
          onClick={(e) => open("notifications", { opener: e.currentTarget })}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 0 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>

        {/* User Dropdown Menu Section */}
        <div className="user-menu-container" style={{ position: "relative" }}>
          <button 
            className={`vd-user ${isUserMenuOpen ? 'active' : ''}`} 
            type="button" 
            aria-label="Account"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <span className="vd-avatar">
               <img 
                  src={user?.image || `https://ui-avatars.com/api/?name=${user?.name}`} 
                  alt={user?.name} 
                  style={{ width: '100%', height: '100%', borderRadius: '50%' }}
               />
            </span>
            <span className="vd-user-meta">
              <span className="vd-user-name">{user?.name}</span>
              <span className="vd-user-role">{user?.role}</span>
            </span>
            <svg 
              className="vd-caret" 
              width="18" height="18" viewBox="0 0 24 24" 
              fill="none" stroke="currentColor" strokeWidth="1.8" 
              aria-hidden="true"
              style={{ transform: isUserMenuOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isUserMenuOpen && (
            <div className="vd-dropdown-menu">
              <button
                className="vd-logout-item"
                type="button"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>Sign out</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

// Convert path to title
function routeToTitle(pathname) {
  const clean = pathname.replace(/^\/+/, "");
  if (!clean) return "Dashboard";

  const base = clean.split("/")[0];

  const map = {
    dashboard: "Dashboard",
    "manage-visitors": "Manage Visitors",
    "expected-today": "Expected Today",
    "expected-tomorrow": "Expected Tomorrow",
    visits: "Visitors",
    settings: "Settings",
    inbox: "Inbox",
  };

  return map[base] || capitalizeWords(base.replace(/-/g, " "));
}

function capitalizeWords(str) {
  return str
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
}

export default Header;