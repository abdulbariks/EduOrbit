import React, { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* TopBar */}
        <TopBar toggleSidebar={toggleSidebar} />

        {/* Content */}
        <div className="flex-1 overflow-y-auto mt-16 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
