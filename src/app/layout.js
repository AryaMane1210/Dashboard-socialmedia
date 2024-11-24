'use client';
import localFont from "next/font/local";
import Sidebar from './components/sidebar'; 
import Top from './components/top';         
import { useState } from 'react';           
import "./globals.css";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({
  children,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  return (
    <html lang="en">
      <head>
        {/* Use <title> for the page title and meta tags */}
        <title>Dashboard</title>
        <meta name="description" content="Generated by create next app" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen overflow-auto"> {/* Flex container to hold Sidebar and Content */}

          {/* Sidebar */}
          <Sidebar
            isOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          {/* Main Content */}
          <div
            className={`flex-1 transition-all duration-300 ease-in-out ${
              isSidebarOpen ? 'lg:ml-64 ml-0' : 'ml-0'
            }`} 
          >
            {/* Top Bar */}
            <Top
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            
            {/* Dynamic Content */}
            <div className="p-4">
              {children} 
            </div>
          </div>

        </div>
      </body>
    </html>
  );
}
