// src/components/Product/AddToCartButton.tsx

"use client"; // This line is very important for buttons

import React from 'react';

interface AddToCartButtonProps {
  productId: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId }) => {
  
  const handleAddToCart = () => {
    console.log(`Product added to cart: ${productId}`);
    alert(`Product ${productId} added to cart!`);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-4 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Add to Cart
    </button>
  );
};

// --- THIS IS THE MOST IMPORTANT LINE ---
// Without this, the file is not "importable"
export default AddToCartButton;