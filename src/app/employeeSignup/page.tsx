"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';
import google from '/public/images/google.png'; // Import Google logo

const EmployeeSignup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [employeeId, setEmployeeId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const validatePassword = (password: string) => {
    const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordPattern.test(password);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    console.log("Email:", email);
    console.log("Employee ID:", employeeId);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
  
    // Perform basic validation
    // if (!email || !employeeId || !password || !confirmPassword) {
    //   setError('All fields are required.');
    //   toast.error('Please fill in all fields.');
    //   return;
    // }
  
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
      toast.error('Password does not meet the requirements.');
      return;
    }
  
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      toast.error('Please ensure passwords match.');
      return;
    }
  
    // Simulate an API call for signup
    try {
      const response = await fetch('/api/employee/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, employeeId, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success('Signup successful! Redirecting to login...');
        setTimeout(() => {
          router.push('/employeeLogin'); // Redirect to the login page after signup
        }, 2000); // Redirect after 2 seconds
      } else {
        setError('Signup failed. Please try again.');
        toast.error('Signup failed. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try again later.');
      toast.error('An error occurred. Please try again later.');
    }
  };
  const handleGoogleSignup = () => {
    // Simulate Google signup redirection
    toast.success('Redirecting to Google signup...');
    setTimeout(() => {
      // Replace with your actual Google signup URL or logic
      window.location.href = 'https://your-google-signup-url.com'; 
    }, 1000); // Redirect after 1 second
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Employee Signup</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-700">Employee Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 mt-1 border text-gray-800 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Employee ID:</label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
              className="w-full p-2 mt-1 border text-gray-800 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 mt-1 border text-gray-800 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 mt-1 border text-gray-800 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full mt-4 p-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center justify-center mt-4">
          <hr className="w-1/4" />
          <span className="mx-2 text-gray-600">or</span>
          <hr className="w-1/4" />
        </div>

        <button
          onClick={handleGoogleSignup}
          className="flex items-center justify-center w-full mt-4 p-2 border border-gray-300 rounded hover:bg-gray-100 transition duration-300"
        >
          <Image
            src={google} // Use imported Google logo
            alt="Google logo"
            width={24}
            height={24}
            className="mr-2" // Margin to the right
          />
          <span className="font-semibold text-gray-700">Sign Up with Google</span>
        </button>

        <p className="mt-4 text-center text-gray-600">
          Already have an account? <a href="/employeeLogin" className="text-blue-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default EmployeeSignup;
