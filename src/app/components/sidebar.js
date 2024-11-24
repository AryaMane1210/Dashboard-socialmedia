'use client';
import Link from 'next/link';
import { useState } from 'react';


const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [active, setActive] = useState('Dashboard'); 
  const handleActive = (name) => setActive(name);

  return (
    
    <div className="h-screen flex">
      
      {/* Sidebar */}
      <div
        className={`h-screen w-64 bg-gray-100 shadow-md fixed lg:relative flex flex-col justify-top transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="text-xl font-bold text-center text-gray-600 py-6">
          Dashboard
        </div>

        {/* Menu */}
        <ul className="mt-12 space-y-2">
          <h2 className="text-black px-6">Quick Menu</h2>
          <li
            className={`px-6 py-2 cursor-pointer  ${
              active === 'Dashboard' ? 'bg-green-200 font-semibold text-black' : 'text-black'
            }`}
            onClick={() => handleActive('Dashboard')}
          >
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li
            className={`px-6 py-2 cursor-pointer ${
              active === 'My Orders' ? 'bg-green-200 font-semibold text-black' : 'text-black'
            }`}
            onClick={() => handleActive('My Orders')}
          >
            <Link href="/users">Users</Link>
          </li>
          <li
            className={`px-6 py-2 cursor-pointer ${
              active === 'Explore' ? 'bg-green-200 font-semibold text-black' : 'text-black'
            }`}
            onClick={() => handleActive('Explore')}
          >
            <Link href="/content">Content</Link>
          </li>
          <li
            className={`px-6 py-2 cursor-pointer ${
              active === 'Products' ? 'bg-green-200 font-semibold text-black' : 'text-black'
            }`}
            onClick={() => handleActive('Products')}
          >
            <Link href="/analytics">Analytics</Link>
          </li>
        </ul>
      </div>
    </div>
    
  );
};

export default Sidebar;
