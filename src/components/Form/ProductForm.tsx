// In src/components/Form/ProductForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/UI/Button';

// Define a simple Product type (you can expand this)
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

// Define the props the component will accept
interface ProductFormProps {
  product: Product | null; // The product to edit, or null for a new product
  onSave: (productData: Omit<Product, 'id'>) => void; // Function to call when saving
  onClose: () => void; // Function to call when closing the form
}

export default function ProductForm({ product, onSave, onClose }: ProductFormProps) {
  // State to manage the form's input fields
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
  });

  // Use useEffect to populate the form when an existing product is passed in
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: Number(formData.price) // Ensure price is a number
    });
  };

  return (
    // The form is often shown inside a modal
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold">{product ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name">Product Name</label>
            <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="w-full p-2 mt-1 border rounded-md" />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input id="price" name="price" type="number" required value={formData.price} onChange={handleChange} className="w-full p-2 mt-1 border rounded-md" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" required value={formData.description} onChange={handleChange} className="w-full p-2 mt-1 border rounded-md" rows={4}></textarea>
          </div>
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {product ? 'Save Changes' : 'Add Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}