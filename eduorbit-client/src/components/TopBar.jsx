import React from "react";

const TopBar = ({ toggleSidebar }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between md:justify-end py-4 px-4 border-b bg-white shadow-sm">
      {/* Sidebar toggle for mobile */}
      <button
        className="md:hidden p-2 rounded hover:bg-gray-100"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Right icons */}
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100">🌓</button>
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          🔔
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-orange-400 rounded-full" />
        </button>
        <div className="flex items-center space-x-2 cursor-pointer">
          <img
            src="https://i.pravatar.cc/32"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
          <span className="font-semibold text-gray-700">Musharof</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
