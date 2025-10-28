// StatCard.jsx
export default function StatCard({ title = 'Checked In Visitors', value = 18, onClick }) {
  return (
    <div className="stat-card-outline" role="button" onClick={onClick}>
      <div className="stat-card-head">{title}</div>
      <div className="stat-card-value">{value}</div>
      <button className="stat-card-link" type="button">View Details</button>
    </div>
  );
}
