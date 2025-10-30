import React, { useState } from "react";
import "../styles/Dashboard.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Inbox = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSidebar = () => setIsSidebarOpen((v) => !v);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen">
      <div
        className={`mobile-overlay ${isSidebarOpen ? "show" : ""}`}
        onClick={closeSidebar}
        aria-hidden={!isSidebarOpen}
      />

      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <main className={`flex-1 p-4 md:p-8 ${isSidebarOpen ? "main-content-shifted" : ""}`}>
        <div className={`dashboard-container ${isSidebarOpen ? "dashboard-container-shifted" : ""}`}>
          <Header onSearch={setSearchTerm} onToggleSidebar={toggleSidebar} />
          <div style={{ padding: 32 }}>
            <h2>Inbox</h2>
            <p>This is a sample Inbox page.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Inbox;
