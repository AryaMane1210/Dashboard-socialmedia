'use client';
import React from 'react';


const Top = ({ isSidebarOpen, toggleSidebar }) => {
  
  return (

    <div className="header shadow-sm p-4 flex flex-col items-center bg-gray-100 w-full max-w-screen overflow-x-hidden z-50">
    {/* Hamburger Button */}
    <div className="lg:hidden flex items-center z-50 absolute top-1 left-1">
      <button
        onClick={toggleSidebar}
        className="bg-gray-100 p-2 rounded-lg shadow-md focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 text-green-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
    <div
      className={`flex flex-col items-center w-full transition-all duration-300 ease-in-out${
        isSidebarOpen ? 'lg:ml-64 ml-0' : ''
      }`}
    >
      {/* Left Section */}
      <div className="header-left flex flex-col sm:flex-row sm:space-x-4 sm:items-center text-center lg:text-left  justify-start">
        <div className="title text-lg text-gray-500 font-bold whitespace-nowrap">Welcome to your Dashboard</div>
        <p className="text-sm text-gray-500 hidden sm:block">Hello Denise,</p>
      </div>

      
    </div>
    </div>
  );
};

export default Top;
 