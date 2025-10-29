import React, { useState } from "react";

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const Avatar = ({ visitor }) => {
  const [imgError, setImgError] = useState(false);
  if (imgError || !visitor?.avatar) {
    return <div className="visitor-avatar-fallback">{getInitials(visitor?.name)}</div>;
  }
  return (
    <img
      src={visitor.avatar}
      alt={visitor.name}
      className="visitor-avatar"
      onError={() => setImgError(true)}
      loading="lazy"
      width={40}
      height={40}
    />
  );
};

const VisitorHistory = ({ visitors = [], onSearch }) => {
  return (
    <main className="main-content">
      <div className="visitor-history-section">
        <div className="section-header">
          <h2 className="section-title">Recent Visitor History</h2>
          <div className="search-container">
            <div className="search-input-wrapper">
              <svg
                className="search-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search Visitors..."
                onChange={(e) => onSearch?.(e.target.value)}
                aria-label="Filter visitors"
              />
            </div>
          </div>
        </div>

        <div className="table-container">
          <table className="visitors-table">
            <thead>
              <tr>
                <th>Visitor</th>
                <th>Visiting</th>
                <th>Purpose</th>
                <th>Check In</th>
                <th>Check Out</th>
              </tr>
            </thead>
            <tbody>
              {visitors.length > 0 ? (
                visitors.map((visitor) => (
                  <tr key={visitor.id}>
                    <td>
                      <div className="visitor-cell">
                        <Avatar visitor={visitor} />
                        <div className="visitor-info">
                          <div className="visitor-name">{visitor.name}</div>
                          <div className="visitor-email">{visitor.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="visiting-cell">
                        <div className="visiting-name">{visitor.visiting}</div>
                        <div className="visiting-role">{visitor.visitingrole}</div>
                      </div>
                    </td>
                    <td>
                      <span className={`purpose-badge ${visitor.purposecolor}`}>
                        {visitor.purpose}
                      </span>
                    </td>
                    <td>
                      <div className="time-cell">{visitor.checkin}</div>
                    </td>
                    <td>
                      <div className="time-cell">{visitor.checkout}</div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "2rem", color: "#6B7280" }}>
                    No visitors found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default VisitorHistory;
