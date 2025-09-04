import React from "react";
import { Navigate, Outlet } from "react-router";

const MainLayout = () => {
  const user = false;
  return (
    <div className="">
      <main className="">
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
