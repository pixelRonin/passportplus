import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './AdminHome'; // Import home component
import Users from './AdminUsers'; // Import users component
import Reports from './AdminReports'; // Import reports component
import Settings from './AdminSettings'; // Import settings component

const AdminDashboardContent = () => {
  return (
    <div>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </div>
  );
};

export default AdminDashboardContent;
