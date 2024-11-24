'use client';

import { useState } from 'react';


const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  
  return (
    <div className="flex h-screen overflow-hidden">
      
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'lg:ml-64 ml-0' : 'ml-16'
        }`}
      >
       
        
        <div className="p-6">
    
         
          <h1></h1>
        </div>
      </div>
    </div>
  );
};

export default HomePage;