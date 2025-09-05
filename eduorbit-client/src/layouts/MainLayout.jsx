import React, { use } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const MainLayout = () => {
  const { user } = use(AuthContext);
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
