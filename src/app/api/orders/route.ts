import { NextResponse } from 'next/server';

// Define the shape of an Order object for consistency
interface Order {
  id: string;
  customerName: string;
  artisanName: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

// Mock database of orders
let orders: Order[] = [
  { id: 'ORD-1001', customerName: 'John Doe', artisanName: "Potter's Studio", date: '2025-09-15', total: 89.98, status: 'Delivered' },
  { id: 'ORD-1002', customerName: 'Jane Smith', artisanName: 'Weaver Studio', date: '2025-09-14', total: 45.99, status: 'Processing' },
  { id: 'ORD-1003', customerName: 'Bob Johnson', artisanName: 'Iron Works', date: '2025-09-13', total: 120.50, status: 'Shipped' },
  { id: 'ORD-1004', customerName: 'Alice Williams', artisanName: 'Silver Arts', date: '2025-09-12', total: 68.00, status: 'Delivered' },
];

/**
 * @handler GET
 * @description Fetches all orders. Can be filtered by userId if provided as a query param.
 */
export async function GET(request: Request) {
  // In a real app, you could filter orders by user, e.g., /api/orders?userId=123
  // const { searchParams } = new URL(request.url);
  // const userId = searchParams.get('userId');

  // For this mock, we'll just return all orders
  return NextResponse.json(orders);
}

/**
 * @handler POST
 * @description Creates a new order.
 */
export async function POST(request: Request) {
  try {
    const { customerName, artisanName, total, items } = await request.json();

    // Basic validation
    if (!customerName || !artisanName || !total || !items) {
      return NextResponse.json(
        { message: 'Missing required order information.' },
        { status: 400 }
      );
    }

    // Create a new order object
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 9000) + 1000}`, // Generate a random mock ID
      customerName,
      artisanName,
      total,
      date: new Date().toISOString().split('T')[0], // Set current date
      status: 'Processing', // Default status for new orders
    };

    // Add the new order to our mock database
    orders.push(newOrder);

    // Return the newly created order
    return NextResponse.json(newOrder, { status: 201 });

  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { message: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}