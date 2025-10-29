import React from "react";

const Activities = ({ activitiesData = [] }) => {
  return (
    <div className="activities-card">
      <div className="activities-cards-header">
      <h2 className="activities-cards-title">Activities</h2>

      </div>
      <div className="activities-list-container">

      <ul className="activities-list">
        {activitiesData.map((activity, index) => (
          <li className="activity-item" key={index}>
            <span
              className="activity-icon-wrapper"
              dangerouslySetInnerHTML={{ __html: activity.icon }}
              aria-hidden="true"
            />
            <span className="activity-text">{activity.text}</span>
            <span className="activity-time">{activity.timeAgo}</span>
          </li>
        ))}
      </ul>

      </div>
    </div>
  );
};

export default Activities;
