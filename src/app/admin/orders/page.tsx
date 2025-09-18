'use client';

import React, { useState, useMemo } from 'react';
import Card from '@/components/UI/Card';

// Define the shape of an Order object
interface Order {
  id: string;
  customerName: string;
  artisanName: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

// Mock data for all orders in the system
const allOrders: Order[] = [
  { id: 'ORD-1001', customerName: 'John Doe', artisanName: "Potter's Studio", date: '2025-09-15', total: 89.98, status: 'Delivered' },
  { id: 'ORD-1002', customerName: 'Jane Smith', artisanName: 'Weaver Studio', date: '2025-09-14', total: 45.99, status: 'Processing' },
  { id: 'ORD-1003', customerName: 'Bob Johnson', artisanName: 'Iron Works', date: '2025-09-13', total: 120.50, status: 'Shipped' },
  { id: 'ORD-1004', customerName: 'Alice Williams', artisanName: 'Silver Arts', date: '2025-09-12', total: 68.00, status: 'Delivered' },
  { id: 'ORD-1005', customerName: 'Charlie Brown', artisanName: 'Woodcraft by John', date: '2025-09-11', total: 35.50, status: 'Cancelled' },
  { id: 'ORD-1006', customerName: 'Diana Prince', artisanName: "Potter's Studio", date: '2025-09-10', total: 24.99, status: 'Shipped' },
];

// Helper to get color classes for different statuses
const getStatusClasses = (status: Order['status']) => {
  switch (status) {
    case 'Delivered': return 'bg-green-100 text-green-800';
    case 'Shipped': return 'bg-blue-100 text-blue-800';
    case 'Processing': return 'bg-yellow-100 text-yellow-800';
    case 'Cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function OrdersOverview() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Memoize the filtering logic so it only runs when data or filters change
  const filteredOrders = useMemo(() => {
    return allOrders
      .filter(order => {
        // Filter by status
        return statusFilter === 'All' || order.status === statusFilter;
      })
      .filter(order => {
        // Filter by search term (checks order ID and customer name)
        const term = searchTerm.toLowerCase();
        return (
          order.id.toLowerCase().includes(term) ||
          order.customerName.toLowerCase().includes(term)
        );
      });
  }, [searchTerm, statusFilter]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>

      {/* Filter and Search Controls */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by Order ID or Customer..."
            className="input-field flex-grow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="input-field sm:w-48"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </Card>

      {/* Orders Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-3 font-semibold">Order ID</th>
                <th className="p-3 font-semibold">Customer</th>
                <th className="p-3 font-semibold">Artisan</th>
                <th className="p-3 font-semibold">Date</th>
                <th className="p-3 font-semibold">Total</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="p-3 font-medium text-blue-600">{order.id}</td>
                  <td className="p-3">{order.customerName}</td>
                  <td className="p-3 text-gray-600">{order.artisanName}</td>
                  <td className="p-3 text-gray-600">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="p-3">${order.total.toFixed(2)}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClasses(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button className="text-blue-600 hover:underline text-sm font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No orders found matching your criteria.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}