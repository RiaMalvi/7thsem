import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// Mock database
const users = new Map(); // In-memory storage for demo purposes

export async function POST(req: Request) {
  try {
    const { email, employeeId, password } = await req.json();

    // Basic validations
    if (!email || !employeeId || !password) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    // Check if user exists
    if (!users.has(email)) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 }); // Change status code to 404
    }

    const user = users.get(email);

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    // Successful login
    return NextResponse.json({ message: 'Login successful!' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred. Please try again later.' }, { status: 500 });
  }
}
