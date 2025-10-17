import React from 'react';

// Data for activities
const activities = [
    { text: "Ridiculus tempus vitae lectus blandit vulputate dolor integer natoque augue.", time: "7 days ago" },
    { text: "Scelerisque ultrices tellus tellus sed mattis egestas purus ut vel.", time: "7 days ago" },
    { text: "Turpis fringilla pellentesque adipiscing neque sit.", time: "7 days ago" },
    { text: "Massa viverra sed arcu scelerisque malesuada.", time: "7 days ago" },
    { text: "Vestibulum lobortis nunc duis tortor malesuada lacinia magna proin.", time: "7 days ago" },
    { text: "Felis pellentesque morbi nunc non enim, tincidunt maecenas.", time: "7 days ago" }
];

// Utility function to get initials from a name
const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
};


const Activities = () => {
  return (
    <aside className="left-sidebar">
      <div className="activities-section">
        <h3 className="section-title">Activities</h3>
        <div className="activities-list">
          {activities.map((activity, index) => (
            <div className="activity-item" key={index}>
              <div className="activity-avatar">
                {getInitials(`Activity ${index + 1}`)}
              </div>
              <div className="activity-content">
                <div className="activity-text">{activity.text}</div>
                <div className="activity-time">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Activities;