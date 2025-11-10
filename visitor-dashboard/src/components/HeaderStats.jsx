// src/components/HeaderStats.jsx
import React, { useRef } from "react";

// 1. Renamed this from 'visitorStats' to 'dashboardStats'
const dashboardStats = [
  { key: "checkedIn", title: "Checked In Visitors", count: 18 },
  { key: "expectedVisitors", title: "Expected Visitors", count: 24 },
  { key: "scheduled", title: "Scheduled Visits", count: 14 },
  { key: "missedVisits", title: "Missed Visits", count: 10 },
];

const securityStats = [
  { key: "expectedVisitors", title: "Expected Visitors", count: 24 },
  { key: "approved", title: "Approved Visitors", count: 14 },
  { key: "reported", title: "Reported Visitors", count: 10 },
];

export default function HeaderStats({ onViewDetails ,pageType = "dashboard"}) {
  const refs = useRef({});

  // This logic is now correct because 'dashboardStats' is defined
  const statsToShow = pageType === "security" ? securityStats : dashboardStats;

  return (
    <header className="stats-header max-w-6xl mx-auto">
      <div className="stats-grid">

        {/* 2. Changed this to map over 'statsToShow' */}
        {statsToShow.map((stat) => (
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