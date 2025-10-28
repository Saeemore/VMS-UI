export default function ProgressRing({ value = 10, label = 'Sales' }) {
  return (
    <div className="ring">
      <svg viewBox="0 0 36 36">
        <path className="ring-bg" d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831" />
        <path className="ring-fg" strokeDasharray={`${value}, 100`} d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831" />
      </svg>
      <div className="ring-center">
        <div className="ring-title">{label}</div>
        <div className="ring-value">{value}</div>
      </div>
    </div>
  );
}
