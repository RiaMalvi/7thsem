"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';
import google from '/public/images/google.png'; // Import Google logo

const EmployeeLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [employeeId, setEmployeeId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Perform basic validation
    if (!email || !employeeId || !password) {
      setError('All fields are required.');
      toast.error('Please fill in all fields.');
      return;
    }

    // Simulate an API call
    try {
      const response = await fetch('/api/employee/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, employeeId, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Login successful! Redirecting...');
        router.push('/dashboard'); // Redirect to the dashboard
      } else {
        // If user is not registered, redirect to signup
        if (data.message === 'User not found.') {
          toast.error('User not found. Redirecting to signup...');
          setTimeout(() => {
            router.push('/signup'); // Redirect to the signup page
          }, 2000); // Redirect after 2 seconds
        } else {
          setError(data.message || 'Login failed. Please check your credentials.');
          toast.error(data.message || 'Login failed. Please check your credentials.');
        }
      }
    } catch {
      setError('An error occurred. Please try again later.');
      toast.error('An error occurred. Please try again later.');
    }
  };

  const handleGoogleLogin = () => {
    // Simulate Google login redirection (this should redirect to your backend auth route)
    toast.success('Redirecting to Google login...');
    setTimeout(() => {
      // Replace with your actual Google login URL or logic
      window.location.href = 'https://your-google-login-url.com'; 
    }, 1000); // Redirect after 1 second
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Employee Login</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-700">Employee Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Employee ID:</label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full mt-4 p-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
        
        <div className="flex items-center justify-center mt-4">
          <hr className="w-1/4" />
          <span className="mx-2 text-gray-600">or</span>
          <hr className="w-1/4" />
        </div>
        
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full mt-4 p-2 border border-gray-300 rounded hover:bg-gray-100 transition duration-300"
        >
          <Image
              src={google} // Use imported Google logo
              alt="Google logo"
              width={24}
              height={24}
              className="mr-2" // Margin to the right
            />
          <span className="font-semibold text-gray-700">Login with Google</span>
        </button>

        <p className="mt-4 text-center text-gray-600">
          Don&apos;t have an account? <a href="/employeeSignup" className="text-blue-600 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default EmployeeLogin;
