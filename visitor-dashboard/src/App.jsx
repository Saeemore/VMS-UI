// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Inbox from "./pages/Inbox";
import ManageVisitors from "./pages/ManageVisitors";
import Security from "./pages/Security";
import Settings from "./pages/Settings";

import { DrawerProvider } from "./hooks/useDrawer";
import RightDrawer from "./components/RightDrawer";
import "./styles/dashboard.css";

export default function App() {
  return (
    <DrawerProvider>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/manage-visitors" element={<ManageVisitors />} />
            <Route path="/security" element={<Security />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>

        <RightDrawer />
      </Router>
    </DrawerProvider>
  );
}
