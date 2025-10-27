import React from 'react';

const Activities = ({ activitiesData }) => {
  return (
    <div className="activities-card">
      <h2 className="activities-card-title">Activities</h2>
      <ul className="activities-list">
        {activitiesData.map((activity, index) => (
          <li className="activity-item" key={index}>
            <span className="activity-icon-wrapper" dangerouslySetInnerHTML={{ __html: activity.icon }}></span>
            <span className="activity-text">{activity.text}</span>
            <span className="activity-time">{activity.timeAgo}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Activities;