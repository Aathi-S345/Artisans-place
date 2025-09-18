import { NextResponse } from 'next/server';

// Define the shape of an Artisan object
interface Artisan {
  id: number;
  name: string;
  business: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  joined: string;
}

// Mock database of artisans. Use 'let' so we can modify it.
let artisans: Artisan[] = [
  { id: 1, name: 'John Doe', business: "Potter's Studio", status: 'Approved', joined: '2023-01-15' },
  { id: 2, name: 'Jane Smith', business: 'Weaver Studio', status: 'Approved', joined: '2023-02-20' },
  { id: 3, name: 'Sam Wilson', business: 'Iron Works', status: 'Pending', joined: '2023-05-10' },
  { id: 4, name: 'Maria Garcia', business: 'Glass Creations', status: 'Pending', joined: '2023-06-01' },
];

/**
 * @handler GET
 * @description Fetches all artisans.
 */
export async function GET(request: Request) {
  // In a real application, you would fetch this from your database.
  return NextResponse.json(artisans);
}

/**
 * @handler PATCH
 * @description Updates an artisan's status (e.g., for approval/rejection).
 */
export async function PATCH(request: Request) {
  try {
    const { artisanId, status } = await request.json();

    // Basic validation
    if (!artisanId || !status) {
      return NextResponse.json({ message: 'Missing artisanId or status.' }, { status: 400 });
    }

    if (!['Approved', 'Rejected'].includes(status)) {
        return NextResponse.json({ message: 'Invalid status value.' }, { status: 400 });
    }

    const artisanIndex = artisans.findIndex(a => a.id === artisanId);

    // Check if artisan exists
    if (artisanIndex === -1) {
      return NextResponse.json({ message: 'Artisan not found.' }, { status: 404 });
    }

    // Update the artisan's status in our mock database
    artisans[artisanIndex].status = status;

    // Return the updated artisan
    return NextResponse.json(artisans[artisanIndex]);

  } catch (error) {
    console.error('Error updating artisan:', error);
    return NextResponse.json(
      { message: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}