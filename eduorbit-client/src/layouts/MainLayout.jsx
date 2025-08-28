import React from "react";
import { Navigate, Outlet } from "react-router";

const MainLayout = () => {
  const user = true;
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-4">
        <Outlet />
      </main>
      {/* Redirect after login */}
      {user && window.location.pathname === "/" && (
        <Navigate to="/home" replace />
      )}
    </div>
  );
};

export default MainLayout;
