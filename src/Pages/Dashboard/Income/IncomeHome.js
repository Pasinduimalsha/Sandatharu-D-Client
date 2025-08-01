import React from 'react';
import { useNavigate } from 'react-router-dom';

const IncomeHome = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'Restaurant Billing',
      description: 'Manage restaurant orders, KOTs, and billing for tables and rooms',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      path: '/dashboard/income/billing'
    },
    {
      title: 'Function Bookings',
      description: 'Manage event bookings, packages, and function hall reservations',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2zM16 3v4M8 3v4M3 11h18" />
        </svg>
      ),
      path: '/dashboard/income/functions'
    },
    {
      title: 'Accommodation',
      description: 'Manage room bookings, check-ins, and accommodation services',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      path: '/dashboard/income/accommodation'
    },
    {
      title: 'KOTs',
      description: 'lllllllllllllllllll',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      path: '/dashboard/income/kots'
    },
    {
      title: 'Bills',
      description: 'djnkfvnfvfnvfvfvfmv',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      path: '/dashboard/income/bills'
    }
  ];

  const stats = [
    { label: 'Today\'s Revenue', value: 'Rs. 125,000' },
    { label: 'Active Bookings', value: '12' },
    { label: 'Pending Orders', value: '8' },
    { label: 'Today\'s Bookings', value: '5' }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Income Management</h1>
        <p className="text-gray-600">Manage all income streams and bookings</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Menu */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-all transform hover:-translate-y-1"
            onClick={() => navigate(item.path)}
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-blue-600">
                {item.icon}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
              
              <button 
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md inline-flex items-center"
                onClick={() => navigate(item.path)}
              >
                Access
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => navigate('/dashboard/income/reports')}
            className="p-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-center"
          >
            <span className="block text-gray-800">View Reports</span>
          </button>
          <button 
            onClick={() => navigate('/dashboard/income/income-sheets')}
            className="p-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-center"
          >
            <span className="block text-gray-800">Income Sheets</span>
          </button>
          <button 
            onClick={() => navigate('/dashboard/income/settings')}
            className="p-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-center"
          >
            <span className="block text-gray-800">Settings</span>
          </button>
          <button 
            onClick={() => navigate('/dashboard/income/help')}
            className="p-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-center"
          >
            <span className="block text-gray-800">Help & Support</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomeHome;