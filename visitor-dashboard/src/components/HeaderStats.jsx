import React, { useRef, useEffect, useState } from "react";
import api from "../api/api"; // ✅ Make sure this file exists

export default function HeaderStats({ onViewDetails }) {
  const [stats, setStats] = useState({
    awaitingApproval: 0,
    expectedVisitors: 0,
    scheduled: 0,
    missedVisits: 0,
  });
  const [loading, setLoading] = useState(true);
  const refs = useRef({});

  // Fetch data from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // ✅ Make sure your backend route matches this endpoint
        const res = await api.get("/host/stats/");
        // console.log("Fetched stats:", res.data);
        setStats({
          awaitingApproval: res.data.awaitingApproval || 0,
          expectedVisitors: res.data.todayExpected || 0,
          scheduled: res.data.expectedTomorrow || 0,
          missedVisits: res.data.missed || 0, // Adjust as needed for your logic
        });
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const visitorStats = [
    { key: "approval", title: "Waiting for Approval", count: stats.awaitingApproval },
    { key: "expectedVisitors", title: "Expected Visitors", count: stats.expectedVisitors },
    { key: "scheduled", title: "Upcoming Visits", count: stats.scheduled },
    { key: "missedVisits", title: "Missed Visits", count: stats.missedVisits },
  ];

  return (
    <header className="stats-header max-w-8xl mx-auto">
      <div className="stats-grid">
        {visitorStats.map((stat) => (
          <div className="stat-card" data-stat={stat.key} key={stat.key}>
            <div className="stat-content">
              <h3 className="stat-card-label">{stat.title}</h3>
              <div className="stat-card-count">{loading ? "..." : stat.count}</div>

  
  


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