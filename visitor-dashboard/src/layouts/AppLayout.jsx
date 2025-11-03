// src/layouts/AppLayout.jsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {useLocation, Outlet } from "react-router-dom";

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((v) => !v);
  const closeSidebar = () => setIsSidebarOpen(false);
  const { pathname } = useLocation();
  // Make sure it matches your Dashboard path exactly
  const showSearch = pathname === "/";  // if your dashboard is at "/"
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
           <Header onToggleSidebar={toggleSidebar} showSearch={showSearch} />
          {/* Route content goes here */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}
