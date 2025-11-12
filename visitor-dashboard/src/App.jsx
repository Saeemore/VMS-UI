// FILE: src/App.jsx
import React from "react";
// --- THIS LINE IS FIXED ---
// We only import Routes and Route, NOT BrowserRouter
import { Routes, Route } from "react-router-dom";
// --------------------------

import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Inbox from "./pages/Inbox";
import ManageVisitors from "./pages/ManageVisitors";
import Security from "./pages/Security";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import { DrawerProvider } from "./hooks/useDrawer";
import RightDrawer from "./components/RightDrawer";
import "./styles/dashboard.css";
import ScanPass from "./pages/ScanPass";

export default function App() {
  return (
    <DrawerProvider>
      {/* --- <Router> TAG REMOVED --- */}
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/manage-visitors" element={<ManageVisitors />} />
            <Route path="/security" element={<Security />} />
            <Route path="/settings" element={<Profile />} />
            <Route path="/scan-pass" element={<ScanPass />} />
          </Route>
        </Routes>

        <RightDrawer />
      {/* --- </Router> TAG REMOVED --- */}
    </DrawerProvider>
  );
}