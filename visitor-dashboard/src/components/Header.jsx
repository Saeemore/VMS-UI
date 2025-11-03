// src/components/Header.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import { useDrawer } from "../hooks/useDrawer"; // add this import

const Header = ({
  onSearch,
  onToggleSidebar,
  showSearch = false,
  pageTitle,
  pageSubtitle,
}) => {
  const { pathname } = useLocation();
  const { open } = useDrawer(); // drawer controller

  const isDashboard = pathname === "/";
  const title = pageTitle ?? (isDashboard ? "Good Morning, John" : routeToTitle(pathname));
  const subtitle = pageSubtitle ?? (isDashboard ? "Here’s your visitors summary" : "");

  return (
    <header className="vd-header">
      <button type="button" className="vd-hamburger" aria-label="Open sidebar" onClick={onToggleSidebar}>
        <span /><span /><span />
      </button>

      <div className="vd-greeting">
        <h1 className="vd-title">{title}</h1>
        {subtitle ? <p className="vd-subtitle">{subtitle}</p> : null}
      </div>

      {showSearch ? (
        <div className="vd-search">
          <svg className="vd-search-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input className="vd-search-input" placeholder="Search anything…" onChange={(e) => onSearch?.(e.target.value)} />
        </div>
      ) : <div />}

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

        <button className="vd-user" type="button" aria-label="Account">
          <span className="vd-avatar" aria-hidden="true" />
          <span className="vd-user-meta">
            <span className="vd-user-name">Karina D</span>
            <span className="vd-user-role">Admin</span>
          </span>
          <svg className="vd-caret" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>
    </header>
  );
};

// Maps pathname to a neat page title
function routeToTitle(pathname) {
  // strip leading slash and split
  const seg = pathname.replace(/^\/+/, "").split("/")[0] || "";
  if (!seg) return "Dashboard";     // safety
  const map = {
    inbox: "Inbox",
    "manage-visitors": "Manage Visitors",
    security: "Security",
    settings: "Settings",
  };
  return map[seg] || capitalizeWords(seg.replace(/-/g, " "));
}

function capitalizeWords(str) {
  return str
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
}
// routeToTitle + capitalizeWords unchanged...
export default Header;
