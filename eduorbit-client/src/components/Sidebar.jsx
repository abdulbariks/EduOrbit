import React from "react";
import { Link } from "react-router";

const menuItems = [
  { title: "Class Schedule", icon: "📊", path: "/class-schedule" },
  { title: "Budget Tracker", icon: "💰", path: "/budget-tracker" },
  { title: "Exam Q&A Generator", icon: "📝", path: "/exam-qa" },
  { title: "Study Planner", icon: "✅", path: "/study-planner" },
];

const Sidebar = ({ open, toggleSidebar }) => {
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden transition-opacity ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r z-40 transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:flex md:flex-col`}
      >
        <div className="p-6 text-2xl font-bold">EduOrbit</div>

        <nav className="flex-1 overflow-y-auto">
          <ul>
            {menuItems.map(({ title, icon, path }) => (
              <li key={title}>
                <Link
                  to={path}
                  className="flex items-center space-x-3 py-3 px-6 rounded hover:bg-gray-100 font-semibold text-gray-700"
                  onClick={() => open && toggleSidebar()}
                >
                  <span>{icon}</span>
                  <span>{title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
