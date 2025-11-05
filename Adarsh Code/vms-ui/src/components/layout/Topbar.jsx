import SearchInput from '../common/SearchInput';

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="greeting">
        <h1>Hi, John Doe</h1>
        <p>Here’s your visitors summary</p>
      </div>

      <div className="topbar-actions">
        <SearchInput placeholder="Search Anything ..." />
        <button className="icon-btn" aria-label="notifications">🔔</button>
        <div className="profile">
          <div className="avatar">K</div>
          <div className="meta">
            <div className="name">Karina D</div>
            <div className="role">Admin</div>
          </div>
          <button className="chev" aria-label="more">▾</button>
        </div>
      </div>
    </header>
  );
}
