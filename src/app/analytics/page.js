'use client';
import { useState } from "react";
import useSWR from "swr";
import {BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend as RechartsLegend, ResponsiveContainer, Cell
} from "recharts";

// API
const fetcher = (url) => fetch(url).then((res) => res.json());
const Dashboard = () => {
  const [timePeriod, setTimePeriod] = useState("daily");
  const { data, error } = useSWR("/api/admin/dashboard", fetcher);

  if (error) return <div>Error loading data...</div>;
  if (!data) return <div>Loading...</div>;

  const userData = data
    ? {
        daily: {
          totalViews: data.dashboard.engagementMetrics.daily.totalViews || 0,
          totalLikes: data.dashboard.engagementMetrics.daily.totalLikes || 0,
          totalPostShares: data.dashboard.contentMetrics.daily.totalPostShares || 0,
          privateChats: data.dashboard.engagementMetrics.daily.privateChats || 0,
        },
        monthly: {
          totalViews: data.dashboard.engagementMetrics.monthly.totalViews || 0,
          totalLikes: data.dashboard.engagementMetrics.monthly.totalLikes || 0,
          totalPostShares: data.dashboard.contentMetrics.monthly.totalPostShares || 0,
          privateChats: data.dashboard.engagementMetrics.monthly.privateChats || 0,
        },
        allTime: {
          totalViews: data.dashboard.engagementMetrics.allTime.totalViews || 0,
          totalLikes: data.dashboard.engagementMetrics.allTime.totalLikes || 0,
          totalPostShares: data.dashboard.contentMetrics.allTime.totalPostShares || 0,
          privateChats: data.dashboard.engagementMetrics.allTime.privateChats || 0,
        },
      }
    : {
        daily: { totalViews: 0, totalLikes: 0, totalPostShares: 0, privateChats: 0 },
        monthly: { totalViews: 0, totalLikes: 0, totalPostShares: 0, privateChats: 0 },
        allTime: { totalViews: 0, totalLikes: 0, totalPostShares: 0, privateChats: 0 },
      };

  const selectedData = userData[timePeriod];

  //charts data
  const rechartsData = [
    { name: "Views", value: selectedData.totalViews },
    { name: "Likes", value: selectedData.totalLikes },
    { name: "Shares", value: selectedData.totalPostShares },
    { name: "Private Chats", value: selectedData.privateChats },
  ];

  return (
    <div className="p-4">
      <div className="justify-center text-center"> Track the performance of your views, likes, shares, and chats over various time periods.</div>
      {/* Buttons */}
      <div className="flex justify-center p-4 space-x-4 mt-4">
        {['daily', 'monthly', 'allTime'].map((period) => (
          <button
            key={period}
            onClick={() => setTimePeriod(period)}
            className={`px-4 py-2 text-white rounded ${timePeriod === period ? "bg-blue-500" : "bg-gray-400"} transition-all duration-200`}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
      
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className="bg-white p-4 rounded-lg shadow-lg h-60 sm:h-80">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={rechartsData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <RechartsTooltip />
        <RechartsLegend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} 
         dot={(dotProps) => {
          const { cx, cy, index } = dotProps;
          const colors = ["#86efac", "#ffc658", "#1d4ed8", "#c4b5fd"];
          return (
            <circle
              cx={cx}
              cy={cy}
              r={3}
              fill={colors[index % colors.length]}
              stroke="#000"
              strokeWidth={2}
            />
          );
        }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>

       
        <div className="bg-white p-4 rounded-lg shadow-lg h-60 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rechartsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <RechartsLegend />
              <Bar dataKey="value" fill="#8884d8">
              {rechartsData.map((entry, index) => {
            const colors = ["#86efac", "#ffc658", "#93c5fd", "#c4b5fd"];
            return (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            );
          })}  

              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Value divs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
        <div className="bg-green-100 p-4 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Views</h3>
          <p className="text-xl font-bold text-green-600">{selectedData?.totalViews}</p>
        </div>
        <div className="bg-orange-100 p-4 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Likes</h3>
          <p className="text-xl font-bold text-orange-600">{selectedData?.totalLikes}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Shares</h3>
          <p className="text-xl font-bold text-blue-600">{selectedData?.totalPostShares}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-gray-700">Private Chats</h3>
          <p className="text-xl font-bold text-purple-600">{selectedData?.privateChats}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
