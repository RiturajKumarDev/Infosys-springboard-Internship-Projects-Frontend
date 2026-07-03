import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PageContainer from './layout/PageContainer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import ContractRepository from './pages/contracts/ContractRepository';
import ContractDetails from './pages/contracts/ContractDetails';
import ArchivedContracts from './pages/contracts/ArchivedContracts';
import Notifications from './pages/notifications/Notifications';
import Reports from './pages/reports/Reports';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected Routes (Main App) */}
        <Route path="/" element={<PageContainer />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          
          {/* Contracts Module */}
          <Route path="contracts" element={<ContractRepository />} />
          <Route path="contracts/:id" element={<ContractDetails />} />
          <Route path="archived" element={<ArchivedContracts />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="reports" element={<Reports />} />
          
          {/* Placeholders for other modules to be implemented in future phases */}
          <Route path="obligations" element={<div className="p-6"><h2>Obligation Tracking</h2></div>} />
          <Route path="renewals" element={<div className="p-6"><h2>Renewal Management</h2></div>} />
          <Route path="compliance" element={<div className="p-6"><h2>Compliance Monitoring</h2></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
