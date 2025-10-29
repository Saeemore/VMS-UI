import React from "react";

const Header = ({ onSearch, onToggleSidebar }) => {
  return (
    <header className="vd-header">
      {/* Mobile hamburger (hidden on desktop) */}
      <button
        type="button"
        className="vd-hamburger"
        aria-label="Open sidebar"
        onClick={onToggleSidebar}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Left: Greeting */}
      <div className="vd-greeting">
        <h1 className="vd-title">Good Morning, John</h1>
        <p className="vd-subtitle">Here’s your visitors summary</p>
      </div>

      {/* Center: Search */}
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
          type="text"
          className="vd-search-input"
          placeholder="Search Anything ..."
          onChange={(e) => onSearch?.(e.target.value)}
          aria-label="Search"
        />
      </div>

      {/* Right: Bell + User chip */}
      <div className="vd-actions">
        <button className="vd-bell" type="button" aria-label="Notifications">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
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
          <svg
            className="vd-caret"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
