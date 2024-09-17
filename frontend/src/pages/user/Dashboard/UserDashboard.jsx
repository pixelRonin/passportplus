import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/UserSidebar'; // Import your Sidebar component

const Layout = () => {
  // State to manage sidebar collapse
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Function to handle sidebar toggle
  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={`flex h-screen ${isSidebarCollapsed ? 'bg-primary-light' : 'bg-primary'}`}>
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={handleSidebarToggle} 
      />

      {/* Main Content Area */}
      <main
        className={`flex-grow transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        } bg-secondary p-6`} // Applying the secondary background color
      >
        {/* Render the nested route's component */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
