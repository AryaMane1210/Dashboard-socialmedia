'use client';
import React, { useState } from 'react';
import useSWR from 'swr';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';

// API
const fetcher = (url) => fetch(url).then((res) => res.json());
const Dashboard = () => {
  const { data, error } = useSWR('/api/admin/dashboard', fetcher);
  const [showPostMetrics, setShowPostMetrics] = useState(false); 

  
  if (error) return <div className="text-red-600">Error loading data...</div>;
  if (!data) return <div className="text-gray-500">Loading...</div>;

  const metrics = {
    daily: {
      totalViews: data.dashboard?.contentMetrics?.daily?.totalViews || 0,
      totalPostShares: data.dashboard?.contentMetrics?.daily?.totalPostShares || 0,
      totalComments: data.dashboard?.contentMetrics?.daily?.totalComments || 0,
      totalPostExitCount: data.dashboard?.contentMetrics?.daily?.totalPostExitCount || 0,
      totalPostBlocked: data.dashboard?.contentMetrics?.daily?.totalPostBlocked || 0,
      totalPostDeleted: data.dashboard?.contentMetrics?.daily?.totalPostDeleted || 0,
    },
  };
// Data for both charts
  const chartData = showPostMetrics
    ? [
        { metric: 'Post Exits', count: metrics.daily.totalPostExitCount },
        { metric: 'Post Blocked', count: metrics.daily.totalPostBlocked },
        { metric: 'Post Deleted', count: metrics.daily.totalPostDeleted },
      ]
    : [
        { metric: 'Views', count: metrics.daily.totalViews },
        { metric: 'Shares', count: metrics.daily.totalPostShares },
        { metric: 'Comments', count: metrics.daily.totalComments },
      ];

  return (
    <div className="p-6">
      <div className="mb-6 text-center">
        <div className="justify-center text-center">
        Track <strong>daily</strong>  views, shares, comments, and post exits.
        </div>
        <p className="text-sm text-gray-500">
          For post exits, click the button below
        </p>
        <button
          className="mt-4 bg-blue-600 rounded p-2 text-white w-full md:w-auto"
          onClick={() => setShowPostMetrics(!showPostMetrics)}
        >
          {showPostMetrics ? 'View Content Details' : 'View Post Exits'}
        </button>
      </div>
{/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-0">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          
          <ResponsiveContainer width="100%" height={285}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                fillOpacity={0.3}
                fill="#8884d8"
                dot={(dotProps) => {
                  const { cx, cy, index } = dotProps;
                  const colors = ["#93c5fd", "#fbbf24", "#f87171"]; 
                  
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={3}
                      fill={colors[index % colors.length]} 
                      stroke={colors[index % colors.length]}  
                      strokeWidth={2}
                    />
                  );
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          
          <ResponsiveContainer width="100%" height={285}>
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="metric"
                outerRadius="80%"
                innerRadius="60%"
                fill="#8884d8"
                stroke="#fff"
              >
                <Cell fill="#93c5fd" />
                <Cell fill="#fbbf24" />
                <Cell fill="#f87171" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
{/* Value Divs */}
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-6 mt-6 p-2">
        {showPostMetrics ? (
          <>
            <div className="bg-blue-100 p-4 sm:p-6 md:p-6 rounded-lg shadow-md text-center">
              <h3 className="text-md font-semibold text-gray-700">Post Exits</h3>
              <p className="text-lg font-bold text-blue-500">
                {metrics.daily.totalPostExitCount}
              </p>
            </div>
            <div className="bg-yellow-100 p-4 sm:p-6 md:p-6 rounded-lg shadow-md text-center">
              <h3 className="text-md font-semibold text-gray-700">Post Blocked</h3>
              <p className="text-lg font-bold text-yellow-500">
                {metrics.daily.totalPostBlocked}
              </p>
            </div>
            <div className="bg-red-100 p-4 sm:p-6 md:p-6 rounded-lg shadow-md text-center">
              <h3 className="text-md font-semibold text-gray-700">Post Deleted</h3>
              <p className="text-lg font-bold text-red-500">
                {metrics.daily.totalPostDeleted}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-blue-100 p-4 sm:p-6 md:p-6 rounded-lg shadow-md text-center">
              <h3 className="text-md font-semibold text-gray-700">Views</h3>
              <p className="text-lg font-bold text-blue-500">
                {metrics.daily.totalViews}
              </p>
            </div>
            <div className="bg-yellow-100 p-4 sm:p-6 md:p-6 rounded-lg shadow-md text-center">
              <h3 className="text-md font-semibold text-gray-700">Shares</h3>
              <p className="text-lg font-bold text-yellow-500">
                {metrics.daily.totalPostShares}
              </p>
            </div>
            <div className="bg-red-100 p-4 sm:p-6 md:p-6 rounded-lg shadow-md text-center">
              <h3 className="text-md font-semibold text-gray-700">Comments</h3>
              <p className="text-lg font-bold text-red-500">
                {metrics.daily.totalComments}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


