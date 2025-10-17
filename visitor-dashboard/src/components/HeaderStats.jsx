import React from 'react';

// Data for the stat cards
const visitorStats = [
  { key: 'checked-in', title: "Checked In Visitors", count: 18 },
  { key: 'expected', title: "Expected Visitors", count: 24 },
  { key: 'scheduled', title: "Scheduled Visits", count: 14 },
  { key: 'missed', title: "Missed Visits", count: 10 }
];

const HeaderStats = () => {
  return (
    <header className="stats-header">
      <div className="stats-grid">
        {visitorStats.map((stat) => (
          <div className="stat-card" data-stat={stat.key} key={stat.key}>
            <div className="stat-content">
              <h3 className="stat-title">{stat.title}</h3>
              <div className="stat-value">{stat.count}</div>
              <a href="#" className="stat-link" onClick={(e) => e.preventDefault()}>View Details</a>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
};

export default HeaderStats;