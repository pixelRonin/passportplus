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
    <div className={`flex h-screen`}>
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={handleSidebarToggle} 
      />

      {/* Main Content Area */}
      <main
        className={`flex-grow transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'ml-16' : 'ml-64'} p-6`}
        style={{ 
          overflowY: 'auto', 
          background: 'linear-gradient(135deg, rgba(247, 210, 117, 1) 0%, rgba(226, 185, 76, 1) 100%)' 
        }}
      >
        {/* Render the nested route's component */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
