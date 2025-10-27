import React, { useState } from 'react';
import { Search } from 'lucide-react';

// Utility function to get initials from a name
const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
};

// Sub-component for handling avatar image with a fallback
const Avatar = ({ visitor }) => {
    const [imgError, setImgError] = useState(false);

    if (imgError) {
        return (
            <div className="visitor-avatar-fallback">
                {getInitials(visitor.name)}
            </div>
        );
    }

    return (
        <img
            src={visitor.avatar}
            alt={visitor.name}
            className="visitor-avatar"
            onError={() => setImgError(true)}
        />
    );
};

const VisitorHistory = ({ visitors, onSearch }) => {
  return (
    <div className="visitor-history-card">
      <div className="visitor-search-input-wrapper">
        <Search className="visitor-search-icon" />
        <input
          type="text"
          className="visitor-search-input"
          placeholder="Search Visitors..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <table className="visitor-table">
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
                  <div className="visitor-info">
                    <Avatar visitor={visitor} />
                    <div>
                      <div className="visitor-name">{visitor.name}</div>
                      <div className="visitor-email">{visitor.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="visitor-name">{visitor.visiting}</div>
                  <div className="visitor-designation">{visitor.visiting_role}</div>
                </td>
                <td>
                  <span className={`purpose-badge ${visitor.purpose_color}`}>
                    {visitor.purpose}
                  </span>
                </td>
                <td>
                  <div className="check-time">{visitor.check_in}</div>
                </td>
                <td>
                  <div className="check-time">{visitor.check_out}</div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#6B7280' }}>
                No visitors found matching your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VisitorHistory;