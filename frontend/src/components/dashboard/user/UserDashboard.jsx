// src/components/Dashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserSidebar from './UserSidebar';
import HomePage from './UserHomePage';
import ProfilePage from './UserProfilePage';
import DocumentsPage from './UserDocumentsPage';
import SettingsPage from './UserSettingsPage';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <UserSidebar />
      <div className="flex-1 flex flex-col">
        <header className="text-black p-4 shadow-md flex items-center">
          <h1 className="text-xl font-bold">My User Dashboard</h1>
        </header>
        <main className="flex-1 p-6 bg-gray-100">
          <Routes>
            <Route path="home" element={<HomePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="/" element={<HomePage />} /> {/* Default route */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
