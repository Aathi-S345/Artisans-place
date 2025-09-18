import { NextResponse } from 'next/server';

// Mock data - replace with real database queries
const products = [
  {
    id: 1,
    name: 'Handcrafted Ceramic Mug',
    price: 24.99,
    image: '/placeholder-mug.jpg',
    artisan: "Potter's Studio",
    rating: 4.8,
    description: 'Beautiful handmade ceramic mug with unique glaze pattern.',
    category: 'Home & Kitchen',
    inStock: true
  },
  // Add more products as needed
];

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate and save product (mock implementation)
    const newProduct = {
      id: products.length + 1,
      ...body,
      createdAt: new Date().toISOString()
    };
    
    products.push(newProduct);
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}