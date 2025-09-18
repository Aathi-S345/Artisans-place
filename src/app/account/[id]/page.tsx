'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'

// Mock user data
const userData = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  joined: '2023-01-15',
  orders: [
    { id: '1001', date: '2023-02-15', total: 89.98, status: 'Delivered' },
    { id: '1002', date: '2023-03-22', total: 45.99, status: 'Processing' },
    { id: '1003', date: '2023-04-05', total: 120.50, status: 'Shipped' }
  ],
  addresses: [
    {
      id: '1',
      name: 'Home',
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      isDefault: true
    },
    {
      id: '2',
      name: 'Work',
      street: '456 Office Blvd',
      city: 'Business City',
      state: 'CA',
      zip: '67890',
      isDefault: false
    }
  ]
}

export default function AccountPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState('orders')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        {/* Profile header */}
        <div className="card mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {userData.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{userData.name}</h2>
              <p className="text-gray-600">{userData.email}</p>
              <p className="text-sm text-gray-500">Member since {new Date(userData.joined).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {['orders', 'addresses', 'settings'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 font-medium ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Order History</h2>
            <div className="space-y-4">
              {userData.orders.map(order => (
                <div key={order.id} className="card">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">Order #{order.id}</p>
                      <p className="text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                      <span className={`inline-block px-2 py-1 rounded text-xs mt-2 ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${order.total.toFixed(2)}</p>
                      <button className="text-blue-600 text-sm">View Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'addresses' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Saved Addresses</h2>
              <button className="btn-primary">Add New Address</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userData.addresses.map(address => (
                <div key={address.id} className="card">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{address.name}</h3>
                    {address.isDefault && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">
                    {address.street}<br />
                    {address.city}, {address.state} {address.zip}
                  </p>
                  <div className="flex space-x-2 mt-4">
                    <button className="text-blue-600 text-sm">Edit</button>
                    {!address.isDefault && (
                      <button className="text-red-600 text-sm">Remove</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <div className="card space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={userData.name}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue={userData.email}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  className="input-field"
                />
              </div>
              <button className="btn-primary">Save Changes</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}