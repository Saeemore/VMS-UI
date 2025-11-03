// src/components/HeaderStats.jsx
import React, { useRef } from "react";

const visitorStats = [
  { key: "checkedIn", title: "Checked In Visitors", count: 18 },
  { key: "expectedVisitors", title: "Expected Visitors", count: 24 },
  { key: "scheduled", title: "Scheduled Visits", count: 14 },
  { key: "missedVisits", title: "Missed Visits", count: 10 },
];

export default function HeaderStats({ onViewDetails }) {
  const refs = useRef({});

  return (
    <header className="stats-header max-w-6xl mx-auto">
      <div className="stats-grid">
        {visitorStats.map((stat) => (
          <div className="stat-card" data-stat={stat.key} key={stat.key}>
            <div className="stat-content">
              <h3 className="stat-card-label">{stat.title}</h3>
              <div className="stat-card-count">{stat.count}</div>

              <button
                ref={(el) => (refs.current[stat.key] = el)}
                type="button"
                className="stat-card-details"
                onClick={() => onViewDetails?.(stat.key, refs.current[stat.key])}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
}
