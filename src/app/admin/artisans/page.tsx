'use client'

import { useState, useEffect } from 'react';

interface Artisan {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  status: 'active' | 'pending' | 'suspended';
  productsCount: number;
  totalSales: number;
}

export default function AdminArtisans() {
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        // Mock data - replace with actual API call
        const mockArtisans: Artisan[] = [
          {
            id: 1,
            name: 'Sarah Johnson',
            email: 'sarah@potterystudio.com',
            joinDate: '2022-03-15',
            status: 'active',
            productsCount: 15,
            totalSales: 12450
          },
          {
            id: 2,
            name: 'Mike Chen',
            email: 'mike@woodcraft.com',
            joinDate: '2023-01-20',
            status: 'active',
            productsCount: 8,
            totalSales: 8450
          },
          {
            id: 3,
            name: 'Emma Rodriguez',
            email: 'emma@textiles.com',
            joinDate: '2023-05-10',
            status: 'pending',
            productsCount: 0,
            totalSales: 0
          }
        ];
        setArtisans(mockArtisans);
      } catch (error) {
        console.error('Failed to fetch artisans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisans();
  }, []);

  const filteredArtisans = filter === 'all' 
    ? artisans 
    : artisans.filter(artisan => artisan.status === filter);

  const updateArtisanStatus = async (id: number, status: Artisan['status']) => {
    try {
      // Mock update - replace with actual API call
      setArtisans(artisans.map(artisan =>
        artisan.id === id ? { ...artisan, status } : artisan
      ));
    } catch (error) {
      console.error('Failed to update artisan status:', error);
      alert('Failed to update artisan status');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Artisans</h1>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded ${
              filter === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded ${
              filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('suspended')}
            className={`px-4 py-2 rounded ${
              filter === 'suspended' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Suspended
          </button>
        </div>
      </div>

      {/* Artisans List */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Artisan</th>
                <th className="text-left py-2">Join Date</th>
                <th className="text-left py-2">Products</th>
                <th className="text-left py-2">Total Sales</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredArtisans.map((artisan) => (
                <tr key={artisan.id} className="border-b">
                  <td className="py-3">
                    <div>
                      <div className="font-medium">{artisan.name}</div>
                      <div className="text-sm text-gray-600">{artisan.email}</div>
                    </div>
                  </td>
                  <td className="py-3">
                    {new Date(artisan.joinDate).toLocaleDateString()}
                  </td>
                  <td className="py-3">{artisan.productsCount}</td>
                  <td className="py-3">${artisan.totalSales.toFixed(2)}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      artisan.status === 'active' ? 'bg-green-100 text-green-800' :
                      artisan.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {artisan.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        View
                      </button>
                      {artisan.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateArtisanStatus(artisan.id, 'active')}
                            className="text-green-600 hover:text-green-800"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateArtisanStatus(artisan.id, 'suspended')}
                            className="text-red-600 hover:text-red-800"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {artisan.status === 'active' && (
                        <button
                          onClick={() => updateArtisanStatus(artisan.id, 'suspended')}
                          className="text-red-600 hover:text-red-800"
                        >
                          Suspend
                        </button>
                      )}
                      {artisan.status === 'suspended' && (
                        <button
                          onClick={() => updateArtisanStatus(artisan.id, 'active')}
                          className="text-green-600 hover:text-green-800"
                        >
                          Reactivate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}