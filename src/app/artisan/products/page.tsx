// In src/app/artisan/products/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/UI/Button';
import ProductForm from '@/components/Form/ProductForm';

// Define a simple Product type (should match the one in your ProductForm)
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

// This is the main page component
export default function ArtisanProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Fetch products (mocked for now)
  useEffect(() => {
    // In a real app, you would fetch this from your API
    const mockProducts: Product[] = [
      { id: '1', name: 'Handcrafted Mug', price: 25, description: 'A beautiful ceramic mug.' },
      { id: '2', name: 'Wooden Bowl', price: 40, description: 'Carved from solid oak.' },
    ];
    setProducts(mockProducts);
  }, []);

  const handleOpenModal = (product: Product | null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSaveProduct = (productData: Omit<Product, 'id'>) => {
    if (editingProduct) {
      // Logic to update an existing product
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...productData } : p));
    } else {
      // Logic to add a new product
      const newProduct: Product = { id: Date.now().toString(), ...productData };
      setProducts([...products, newProduct]);
    }
    handleCloseModal();
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Your Products</h1>
        <Button onClick={() => handleOpenModal(null)}>Add New Product</Button>
      </div>

      {/* Product List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          {products.map(product => (
            <div key={product.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-600">${product.price}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleOpenModal(product)}>
                  Edit
                </Button>
                {/* Add delete logic here */}
                <Button variant="destructive" size="sm">Delete</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Modal */}
      {isModalOpen && (
        <ProductForm 
          product={editingProduct} 
          onSave={handleSaveProduct} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}