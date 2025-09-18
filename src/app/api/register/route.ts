// In src/app/api/register/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // In a real application, you would check if the user already exists in your database here.
    // Example: const userExists = await db.user.findUnique({ where: { email } });
    // if (userExists) {
    //   return new NextResponse("User already exists", { status: 400 });
    // }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // In a real application, you would save the new user to your database.
    // Example: await db.user.create({ data: { name, email, hashedPassword, role: 'customer' } });

    console.log({ name, email, hashedPassword });

    return new NextResponse("User has been created", { status: 201 });
  } catch (error) {
    return new NextResponse("An error occurred", { status: 500 });
  }
}