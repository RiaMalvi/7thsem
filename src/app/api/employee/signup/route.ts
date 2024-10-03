import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// Mock database
const users = new Map(); // In-memory storage for demo purposes

export async function POST(req: Request) {
  try {
    const { email, employeeId, password, contactNumber } = await req.json();

    // Basic validations
    if (!email || !employeeId || !password || !contactNumber) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    // Check if user already exists
    if (users.has(email)) {
      return NextResponse.json({ message: 'User already exists.' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to "database"
    users.set(email, {
      employeeId,
      contactNumber,
      password: hashedPassword,
    });

    return NextResponse.json({ message: 'User created successfully!' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred. Please try again later.' }, { status: 500 });
  }
}
