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
    <header className="stats-header max-w-6xl mx-auto">
      <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visitorStats.map((stat) => (
          <div className="stat-card bg-white rounded-lg shadow-md p-6"  data-stat={stat.key} key={stat.key}>
            <div className="stat-content " >
              <h3 className="stat-title font-normal text-base leading-none tracking-normal text-gray-500 mb-4 uppercase">{stat.title}</h3>
              <div className="stat-value font-bold text-4xl leading-none tracking-normal text-gray-900 mb-4">{stat.count}</div>
              <a href="#" className="stat-link font-normal text-sm leading-none tracking-normal text-blue-600 hover:underline" onClick={(e) => e.preventDefault()}>View Details</a>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
};

export default HeaderStats;