// In src/components/admin/AdminDashboardClient.tsx
'use client'

import { useState, useEffect } from 'react';

// Define the shape of your dashboard data
interface DashboardStats {
  totalArtisans: number;
  totalOrders: number;
  totalRevenue: number;
  pendingApprovals: number;
}

// This is your UI component, now isolated
export default function AdminDashboardClient() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // TODO: Replace with a real API call to fetch admin stats
        // For now, we use mock data after a short delay
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        setStats({
          totalArtisans: 247,
          totalOrders: 1256,
          totalRevenue: 89450,
          pendingApprovals: 23
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    // A simple loading spinner
    return <div>Loading dashboard data...</div>;
  }
  
  if (!stats) {
    return <div>Could not load dashboard stats.</div>;
  }

  // Your full dashboard UI goes here
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h3 className="text-3xl font-bold text-blue-600">{stats.totalArtisans}</h3>
          <p className="text-gray-600">Total Artisans</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h3 className="text-3xl font-bold text-blue-600">{stats.totalOrders}</h3>
          <p className="text-gray-600">Total Orders</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h3 className="text-3xl font-bold text-blue-600">${stats.totalRevenue.toLocaleString()}</h3>
          <p className="text-gray-600">Total Revenue</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h3 className="text-3xl font-bold text-yellow-500">{stats.pendingApprovals}</h3>
          <p className="text-gray-600">Pending Approvals</p>
        </div>
      </div>
      {/* ... rest of your dashboard UI (Quick Actions, Recent Activity, etc.) */}
    </div>
  );
}