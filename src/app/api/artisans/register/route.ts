// In src/app/api/artisans/register/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    // In a real application, you would save this application data to your database
    // for an admin to review.
    console.log("New Artisan Application Received:", formData);

    return NextResponse.json(
      { message: "Application submitted successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Artisan Registration Error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration." },
      { status: 500 }
    );
  }
}