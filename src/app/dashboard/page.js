'use client';
import { useState } from 'react';
import useSWR from 'swr';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);
// API
const fetcher = (url) => fetch(url).then((res) => res.json());

const Dashboard = () => {
  const [timePeriod, setTimePeriod] = useState('daily');
  const { data, error } = useSWR('/api/admin/dashboard', fetcher);

  if (error) return <div className="text-red-600">Error loading data...</div>;
  if (!data) return <div className="text-gray-500">Loading...</div>;

  const metrics = {
    daily: {
      totalViews: data.dashboard?.engagementMetrics?.daily?.totalViews || 0,
      totalLikes: data.dashboard?.engagementMetrics?.daily?.totalLikes || 0,
      totalComments: data.dashboard?.contentMetrics?.daily?.totalComments || 0,
      totalViews1: data.dashboard?.contentMetrics?.daily?.totalViews || 0,
      totalPostShares: data.dashboard?.contentMetrics?.daily?.totalPostShares || 0,
    },
    monthly: {
      totalViews: data.dashboard?.engagementMetrics?.monthly?.totalViews || 0,
      totalLikes: data.dashboard?.engagementMetrics?.monthly?.totalLikes || 0,
      totalComments: data.dashboard?.contentMetrics?.monthly?.totalComments || 0,
      totalViews1: data.dashboard?.contentMetrics?.monthly?.totalViews || 0,
      totalPostShares: data.dashboard?.contentMetrics?.monthly?.totalPostShares || 0,
    },
    allTime: {
      totalViews: data.dashboard?.engagementMetrics?.allTime?.totalViews || 0,
      totalLikes: data.dashboard?.engagementMetrics?.allTime?.totalLikes || 0,
      totalComments: data.dashboard?.contentMetrics?.allTime?.totalComments || 0,
      totalViews1: data.dashboard?.contentMetrics?.allTime?.totalViews || 0,
      totalPostShares: data.dashboard?.contentMetrics?.allTime?.totalPostShares || 0,
    },
  };
// Data for charts
  const chartData1 = {
    labels: ['Total Views', 'Total Likes', 'Total Comments'],
    datasets: [
      {
        label: 'Engagement Metrics',
        data: [
          metrics[timePeriod].totalViews,
          metrics[timePeriod].totalLikes,
          metrics[timePeriod].totalComments,
        ],
        backgroundColor: [
          'rgba(0, 204, 204, 0.2)',  
          'rgba(255, 127, 80, 0.2)',  
          'rgba(65, 105, 225, 0.2)',  
        ],
        borderColor: [
          '#008B8B',
          '#FF6347',
          '#4169E1',
        ],
        borderWidth: 3,
        pointBackgroundColor: ['#008B8B', '#FF6347', '#4169E1'],  

      },
    ],
  };

  const chartData2 = {
    labels: ['Views', 'Likes', 'Shares'],
    datasets: [
      {
        label: 'Content Metrics',
        data: [
          metrics[timePeriod].totalViews1,
          metrics[timePeriod].totalLikes,
          metrics[timePeriod].totalPostShares,
        ],
        backgroundColor: [
          'rgba(0, 204, 204, 0.2)',  
          'rgba(255, 127, 80, 0.2)',  
          'rgba(255, 223, 0, 0.2)',   
        ],
        borderColor: [
          '#008B8B',  
          '#FF6347',  
          '#FFD700',  
        ],
        borderWidth: 3,
        fill: true,
        pointBackgroundColor: ['#008B8B', '#FF6347', '#FFD700'],  

      },
    ],
  };

  const chartData3 = {
    labels: ['Total Views', 'Total Likes', 'Total Comments', 'Shares'],
    datasets: [
      {
        label: 'Metrics Distribution',
        data: [
          metrics[timePeriod].totalViews,
          metrics[timePeriod].totalLikes,
          metrics[timePeriod].totalComments,
          metrics[timePeriod].totalPostShares,
        ],
        backgroundColor: [
          'rgba(0, 204, 204, 0.2)',  
          'rgba(255, 127, 80, 0.2)',  
          'rgba(65, 105, 225, 0.2)',  
          'rgba(255, 223, 0, 0.2)',   
        ],
        borderColor: [
          '#008B8B',  
          '#FF6347',  
          '#4169E1',  
          '#FFD700',  
        ],
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
  };

  return (
    <div className="p-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">Dashboard</h2>

      {/*  Buttons */}
      <div className="flex justify-center p-4 space-x-4 mt-4">
        {['daily', 'monthly', 'allTime'].map((period) => (
          <button
            key={period}
            onClick={() => setTimePeriod(period)}
            className={`px-4 py-2 rounded text-white ${
              timePeriod === period ? 'bg-blue-500' : 'bg-gray-400'
            } transition-all duration-200`}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className="flex flex-wrap lg:flex-nowrap gap-6">
      
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:w-3/4 w-full">
          <div className=" p-4 rounded-lg shadow-md border-2 border-gray-300 min-h-[250px] sm:w-full">
            <Line data={chartData1} options={options} />
          </div>
          <div className=" p-4 rounded-lg shadow-md border-2 border-gray-300 min-h-[250px] sm:w-full">
            <Bar data={chartData1} options={options} />
          </div>
          <div className=" p-4 rounded-lg shadow-md  min-h-[250px] sm:w-full">
         {/* Value Divs */}
          <div className="grid grid-cols-2 gap-6 w-full">
            <div className=" p-4 rounded-lg shadow-md bg-teal-100 bg-opacity-25 border-2 border-teal-300 text-center">
              <h4 className="font-semibold text-teal-400">Total Views</h4>
              <p className="text-xl text-teal-400">{metrics[timePeriod].totalViews}</p>
            </div>
            <div className=" p-4 rounded-lg shadow-md bg-red-100 bg-opacity-25 border-2 border-red-300 text-center">
              <h4 className="font-semibold text-red-400">Total Likes</h4>
              <p className="text-xl text-red-400">{metrics[timePeriod].totalLikes}</p>
            </div>
            <div className=" p-4 rounded-lg shadow-md bg-blue-100 bg-opacity-25 border-2 border-blue-300 text-center">
              <h4 className="font-semibold text-blue-400">Total Comments</h4>
              <p className="text-xl text-blue-400">{metrics[timePeriod].totalComments}</p>
            </div>
            <div className=" p-4 rounded-lg shadow-md bg-yellow-100 bg-opacity-25 border-2 border-yellow-300 text-center">
              <h4 className="font-semibold text-yellow-400">Total Shares</h4>
              <p className="text-xl text-yellow-400">{metrics[timePeriod].totalPostShares}</p>
            </div>
          </div>
          </div>
          <div className=" p-4 rounded-lg shadow-md border-2 border-gray-300 min-h-[250px] sm:w-full">
          <Line data={chartData2} options={options} />
          </div>
        </div>
       
        {/* Pie Chart */}
        <div className=" p-4 rounded-lg shadow-md border-2 border-gray-300 w-full lg:w-1/4 flex items-center justify-center min-h-[350px] lg:min-h-full">
          <Pie data={chartData3} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;















