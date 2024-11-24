'use client';
import React, { useState } from 'react';
import useSWR from 'swr';
import { BarChart, Bar, XAxis, YAxis,CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
  } from 'recharts';
// API
const fetcher = (url) => fetch(url).then((res) => res.json());
const Dashboard = () => {
     
  
  const [timePeriod, setTimePeriod] = useState('daily');
  const { data, error } = useSWR('/api/admin/dashboard', fetcher);
 
  
  if (error) return <div className="text-red-600">Error loading data...</div>;
  if (!data) return <div className="text-gray-500">Loading...</div>;

  const metrics = {
    daily: {
      totalUser: data.dashboard?.userMetrics?.daily?.totalUser || 0,
      totalReferral: data.dashboard?.userMetrics?.daily?.totalReferral || 0,
      activeUser: data.dashboard?.userMetrics?.daily?.activeUser || 0,
      creator: data.dashboard?.userMetrics?.daily?.creator || 0,
       },
    monthly: {
      totalUser: data.dashboard?.userMetrics?.monthly?.totalUser|| 0,
      totalReferral: data.dashboard?.userMetrics?.monthly?.totalReferral || 0,
      activeUser: data.dashboard?.userMetrics?.monthly?. activeUser || 0,
      creator: data.dashboard?.userMetrics?.monthly?. creator|| 0,
        },
    allTime: {
      totalUser: data.dashboard?.userMetrics?.allTime?.totalUser || 0,
      totalReferral: data.dashboard?.userMetrics?.allTime?.totalReferral|| 0,
      activeUser: data.dashboard?.userMetrics?.allTime?.activeUser|| 0,
      creator: data.dashboard?.userMetrics?.allTime?.creator || 0,
     },
  };



  // Bar chart Data
  const barChartData = [
    { name: 'Active Users', value: metrics[timePeriod].activeUser },
    { name: 'Total Referral', value: metrics[timePeriod].totalReferral },
    { name: 'Creators', value: metrics[timePeriod].creator },
  ];

  // Pie chart data 
  const pieChartData = [
    { name: 'Active Users', value: metrics[timePeriod].activeUser },
    { name: 'Total Referral', value: metrics[timePeriod].totalReferral },
    { name: 'Creators', value: metrics[timePeriod].creator },
  ];

  return (
    <div className="p-4">
      <div className="text-center mb-6">
        
      <div className="justify-center text-center"> Monitor and track activity, referrals, and identify active users and creators over a period of time</div>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-3">
        {/* BarChart */}
        <div className="bg-white p-4 rounded-lg shadow-lg ">
          <ResponsiveContainer width="100%" height={275} >
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8">
              {barChartData.map((entry, index) => {
            const colors = ["#fd9e4d", "#c4b5fd", "#5eead4"];
            return (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            );
          })} 
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PieChart */}
        <div className="bg-white p-4 rounded-lg shadow-lg justify-center">
          <ResponsiveContainer width="100%" height={275}>
            <PieChart>
              <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8"
               label = {({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                const RADIAN = Math.PI / 180;
                const radius = outerRadius + 10;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                return (
                  <text
                    x={x}
                    y={y}
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                    fill={pieChartData[index].color} 
                    fontSize="14">
                        {`${pieChartData[index].name}: ${value}`}
                        </text>
                  );
                }}
            >  
                <Cell fill="#fd9e4d" />
                <Cell fill="#c4b5fd" />
                <Cell fill="#5eead4" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6">
        {/* Value Divs */}
        <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
          <h4 className="text-md font-semibold text-gray-500">Total Users</h4>
          <p className="text-xl font-bold text-blue-500">{metrics[timePeriod].totalUser}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg shadow-md text-center">
         <h4 className="text-md font-semibold text-gray-500">Active Users</h4>
         <p className="text-xl font-bold text-purple-500">{metrics[timePeriod].activeUser}</p>
        </div>
        <div className="bg-orange-100 p-4 rounded-lg shadow-md text-center">
         <h4 className="text-md font-semibold text-gray-500">Referrals </h4>
         <p className="text-xl font-bold text-orange-500">{metrics[timePeriod].totalReferral}</p>       
        </div>
        <div className="bg-teal-100 p-4 rounded-lg shadow-md text-center">
          <h4 className="text-md font-semibold text-gray-500">Creators</h4>
          <p className="text-xl font-bold text-teal-500">{metrics[timePeriod].creator}</p>
        </div>
      </div>
    </div>
  );
};     
export default Dashboard;