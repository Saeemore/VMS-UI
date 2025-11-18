import React, { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/Activities.css";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch unread notifications
  const fetchUnreadNotifications = async () => {
    try {
      const res = await api.get("/notifications"); // <-- backend route
      const unread = res.data.filter((n) => !n.isRead); // only unread
      setActivities(unread);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnreadNotifications();
  }, []);

  return (
    <div className="activities-card">
      <div className="activities-header">
        <h3>Activities</h3>
        
      </div>
      <div className="activities-body">
        {loading ? (
          <p>Loading...</p>
        ) : activities.length === 0 ? (
          <p className="text-gray-500">No unread notifications 🎉</p>
        ) : (
          <ul className="activities-list">
            {activities.map((activity) => (
              <li key={activity._id} className="activity-item">
                <div className="activity-left">
                  <div className="activity-icon">🔔</div>
                  <div className="activity-text">
                    {activity.message || "Notification"}
                  </div>
                </div>
                <div className="activity-time">
                  {new Date(activity.createdAt).toLocaleDateString()}{" "}
                  {new Date(activity.createdAt).toLocaleTimeString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
