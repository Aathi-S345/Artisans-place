// src/app/product/[id]/page.tsx

'use client';

import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';

// You should have a Product type, maybe defined in a types/ folder
interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    // It might also have a quantity field representing stock, which we need to omit
    quantity?: number; 
}

// This is a fake function to simulate fetching a product
async function getProductById(id: number): Promise<Product> {
    // In a real app, you would fetch from your API:
    // const res = await fetch(`/api/products/${id}`);
    // return res.json();
    
    // For now, return some dummy data
    return {
        id: id,
        name: "Handcrafted Wooden Bowl",
        price: 45.00,
        image: "https://via.placeholder.com/400", // Replace with a real image URL
        description: "A beautiful bowl handcrafted from solid maple wood, perfect for salads or as a decorative centerpiece.",
        quantity: 50 // This represents stock level, NOT cart quantity
    };
}


export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<Product | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            const productId = parseInt(params.id, 10);
            if (!isNaN(productId)) {
                const fetchedProduct = await getProductById(productId);
                setProduct(fetchedProduct);
            }
        };
        fetchProduct();
    }, [params.id]);

    const handleAddToCart = () => {
        if (product) {
            // THE FIX IS HERE:
            // We pass the `product` object directly to `addToCart`.
            // Our context knows how to handle the quantity from here.
            addToCart(product);
        }
    };

    if (!product) {
        return <div>Loading product...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-lg" />
                </div>
                <div>
                    <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                    <p className="text-2xl text-gray-800 mb-6">${product.price.toFixed(2)}</p>
                    <p className="text-gray-600 mb-6">{product.description}</p>
                    <button onClick={handleAddToCart} className="btn-primary w-full md:w-auto">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}