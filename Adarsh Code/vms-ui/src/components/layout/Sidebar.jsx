import { useEffect } from 'react';
import logo from '../../assets/react.svg';

const NavItem = ({ icon, label, active, collapsed }) => (
  <a href="#" className={`nav-item ${active ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`} aria-label={label}>
    <span className="nav-icon" aria-hidden>{icon}</span>
    {!collapsed && <span className="nav-label">{label}</span>}
  </a>
);

export default function Sidebar({ collapsed, setCollapsed }) {
  // lock sidebar width so layout doesn’t shift while fonts load
  useEffect(() => {
    document.body.style.setProperty('--sidebar-w', collapsed ? '78px' : '320px');
  }, [collapsed]);

  return (
    <div className={`sidebar estmac ${collapsed ? 'is-collapsed' : ''}`}>
      <div className="brand">
        <img src={logo} alt="ESTMAC" />
        {!collapsed && <span className="brand-text">ESTMAC</span>}
      </div>

      {/* persistent collapse button */}
      <button
        type="button"
        className="collapse-btn"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        onClick={() => setCollapsed(v => !v)}
      >
        {collapsed ? '›' : '‹'}
      </button>

      <nav className="nav">
        <NavItem icon="▦" label="Dashboard" active collapsed={collapsed} />
        <NavItem icon="✉︎" label="Inbox" collapsed={collapsed} />
        <NavItem icon="👥" label="Manage Visitors" collapsed={collapsed} />
        <NavItem icon="🛡︎" label="Security" collapsed={collapsed} />
      </nav>

      <a href="#" className={`settings ${collapsed ? 'collapsed' : ''}`} aria-label="Settings">
        <span className="nav-icon">⚙︎</span>
        {!collapsed && <span className="nav-label">Settings</span>}
      </a>
    </div>
  );
}
