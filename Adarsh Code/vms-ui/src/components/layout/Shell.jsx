import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Shell({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`app-shell ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <aside className="app-sidebar">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </aside>
      <div className="app-main">
        <Topbar />
        <main className="app-content">{children}</main>
      </div>
    </div>
  );
}
