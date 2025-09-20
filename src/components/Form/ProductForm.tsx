// In src/components/Form/ProductForm.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/UI/Button'; // FIX: Correct named import

export default function ProductForm() {
  const [productName, setProductName] = useState('');
  // Add other form states here (price, description, etc.)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to submit the new product to your API
    console.log({ productName });
    alert('Product submitted!');
  };

  return (
    <div className="w-full max-w-xl p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">Add a New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="productName">Product Name</label>
          <input
            id="productName"
            type="text"
            required
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded-md"
          />
        </div>
        {/* Add other form fields here (price, description, image upload, etc.) */}
        <div>
          <Button type="submit" className="w-full">
            Add Product
          </Button>
        </div>
      </form>
    </div>
  );
}