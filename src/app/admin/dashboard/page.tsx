'use client'

import { useState, useEffect } from 'react';

interface DashboardStats {
  totalArtisans: number;
  totalOrders: number;
  totalRevenue: number;
  pendingApprovals: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalArtisans: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingApprovals: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        // Mock data - replace with actual API call
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
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <h3 className="text-2xl font-bold text-blue-600">{stats.totalArtisans}</h3>
          <p className="text-gray-600">Total Artisans</p>
        </div>
        <div className="card text-center">
          <h3 className="text-2xl font-bold text-blue-600">{stats.totalOrders}</h3>
          <p className="text-gray-600">Total Orders</p>
        </div>
        <div className="card text-center">
          <h3 className="text-2xl font-bold text-blue-600">${stats.totalRevenue}</h3>
          <p className="text-gray-600">Total Revenue</p>
        </div>
        <div className="card text-center">
          <h3 className="text-2xl font-bold text-blue-600">{stats.pendingApprovals}</h3>
          <p className="text-gray-600">Pending Approvals</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a href="/admin/artisans" className="block w-full btn-primary text-center">
              Manage Artisans
            </a>
            <a href="/admin/orders" className="block w-full btn-secondary text-center">
              View Orders
            </a>
            <a href="/admin/certificates" className="block w-full btn-secondary text-center">
              Validate Certificates
            </a>
            <a href="/admin/training" className="block w-full btn-secondary text-center">
              Manage Training
            </a>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>New artisan registrations</span>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Pending certificate verifications</span>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Support tickets awaiting response</span>
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">5</span>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">API Services</p>
            <p className="font-semibold">Operational</p>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Database</p>
            <p className="font-semibold">Operational</p>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Payment Processing</p>
            <p className="font-semibold">Operational</p>
          </div>
        </div>
      </div>
    </div>
  );
}