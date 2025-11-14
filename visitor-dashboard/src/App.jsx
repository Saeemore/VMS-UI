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
import RegisterPage from "./pages/RegisterPage.jsx";  
import Landing from "./pages/common/Landing.jsx";
import DigitalPass from "./pages/public/DigitalPass.jsx";
import Login from "./pages/Login.jsx"
import NotFound from "./pages/NotFound.jsx"
import Unauthorized from "./pages/Unauthorized.jsx" 
import { useAuth } from "./hooks/useAuth.jsx";
import Spinner from "./components/common/Spinner.jsx";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
// ProtectedRoute remains the same
const ProtectedRoute = ({ roles }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner size="lg" />
            </div>
        );
    }
    if (!user) {
        return <Navigate to="/login" />;
    }
    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }
    return <Outlet />;
};

export default function App() {
  return (
    <DrawerProvider>
        <Routes>
   {/* Public Routes */}
      <Route path="/" element={<Landing/>} />
      <Route path="/:companyId/Register" element={<RegisterPage />} />

      <Route path="/pass/:passCode" element={<DigitalPass />} />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      {/* --- <Router> TAG REMOVED --- */}
{/*           <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/manage-visitors" element={<ManageVisitors />} />
            <Route path="/security" element={<Security />} />
            <Route path="/settings" element={<Profile />} />
            <Route path="/scan-pass" element={<ScanPass />} />
<Route path="/register" element={<RegisterPage />} />
          </Route> */}
         <Route element={<AppLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/settings" element={<Profile />} />
          <Route path="/notifications" element={<Inbox />} />
        </Route>
        
        <Route element={<ProtectedRoute roles={['host']} />}>
          <Route path="/host/dashboard" element={<Dashboard />} />
            <Route path="/host/manage-visitors" element={<ManageVisitors />} />
          {/* The /host/pre-register route is now removed */}
        </Route>

        <Route element={<ProtectedRoute roles={['security']} />}>
          <Route path="/security/dashboard" element={<Security />} />
            <Route path="/security/scan-pass" element={<ScanPass />} />
        </Route>
        
        {/* <Route element={<ProtectedRoute roles={['admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/companies" element={<AdminCompanies />} />
          <Route path="/admin/reports" element={<AdminReports />} />
        </Route> */}
      </Route>
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
</Routes>

        <RightDrawer />
      {/* --- </Router> TAG REMOVED --- */}
    </DrawerProvider>
  );
}