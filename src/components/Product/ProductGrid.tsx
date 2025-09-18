// AFTER THE FIX - Copy all of this code into ProductGrid.tsx

import React from 'react';
import ProductCard from './ProductCard';

// 1. DEFINE THE PROPS TYPE HERE
// This tells TypeScript what "props" to expect.
interface ProductGridProps {
  products: any[]; // We're telling TS that "products" is an array.
}

// 2. APPLY THE TYPE TO YOUR COMPONENT HERE
// Notice the ": ProductGridProps" part we added.
const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;