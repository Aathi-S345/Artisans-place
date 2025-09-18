'use client'

import { useState } from 'react';

interface TrainingMaterial {
  id: number;
  title: string;
  description: string;
  type: 'video' | 'article' | 'course';
  duration: string;
  completed: boolean;
}

export default function ArtisanTraining() {
  const [materials] = useState<TrainingMaterial[]>([
    {
      id: 1,
      title: 'Product Photography Basics',
      description: 'Learn how to take professional photos of your products',
      type: 'video',
      duration: '15 min',
      completed: true
    },
    {
      id: 2,
      title: 'Pricing Strategies for Artisans',
      description: 'How to price your products for profit and competitiveness',
      type: 'article',
      duration: '10 min',
      completed: true
    },
    {
      id: 3,
      title: 'Advanced Marketing Techniques',
      description: 'Grow your customer base with advanced marketing strategies',
      type: 'course',
      duration: '45 min',
      completed: false
    }
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Training Materials</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((material) => (
          <div key={material.id} className="card">
            <div className="flex items-center mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                material.type === 'video' ? 'bg-blue-100' :
                material.type === 'article' ? 'bg-green-100' : 'bg-purple-100'
              }`}>
                <span className="text-sm font-semibold">
                  {material.type === 'video' ? '🎬' : 
                   material.type === 'article' ? '📖' : '🎓'}
                </span>
              </div>
              <span className="ml-2 text-sm text-gray-600">{material.type}</span>
            </div>
            
            <h3 className="text-xl font-semibold mb-2">{material.title}</h3>
            <p className="text-gray-600 mb-4">{material.description}</p>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{material.duration}</span>
              {material.completed ? (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Completed
                </span>
              ) : (
                <button className="btn-primary text-sm">
                  Start Learning
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-8">
        <h2 className="text-xl font-semibold mb-4">Additional Resources</h2>
        <ul className="space-y-2">
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              • Artisan Community Forum
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              • Shipping and Packaging Guide
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              • Customer Service Best Practices
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              • Tax Information for Artisans
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}