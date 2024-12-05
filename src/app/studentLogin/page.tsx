"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import google from "/public/images/google.png"; // Import Google logo
import { instance } from "@/config/axios";
import toast from "react-hot-toast";

const StudentLogin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const mockLogin = ({ email, studentId, password }: any) => {
    if (!email || !studentId || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (
      !(
        email == "lcb2021016@iiitl.ac.in" ||
        email == "lcb2021017@iiitl.ac.in" ||
        email == "lci2021052@iiitl.ac.in"
      ) ||
      !(
        studentId == "LCB2021016" ||
        studentId == "LCB2021017" ||
        studentId == "LCI2021052"
      ) ||
      password !== "password"
    ) {
      toast.error("Invalid credentials. Please try again.");
      return;
    }
    toast.success("Login successful! Redirecting...");
    setTimeout(() => {
      router.push("/studentDashboard"); // Redirect to the dashboard
    }, 1000); // Redirect after 1 second
  };

  const handleLogin = async ({ email, studentId, password }: any) => {
    try {
      const response = await instance.post("/api/auth/student", {
        email,
        studentId,
        password,
      });
      if (response.data.error) {
        setError(response.data.error);
        return;
      }
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        router.push("/studentDashboard"); // Redirect to the dashboard
      }, 1000); // Redirect after 1 second
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    // Simulate Google login redirection (this should redirect to your backend auth route)
    toast.success("Redirecting to Google login...");
    setTimeout(() => {
      // Replace with your actual Google login URL or logic
      window.location.href = "https://your-google-login-url.com";
    }, 1000); // Redirect after 1 second
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Student Login
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin({ email, studentId, password });
          }}
        >
          <div className="mb-4">
            <label className="block text-gray-700">Student Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full text-black p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Student ID:</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
              className="w-full text-black p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 text-black mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full text-black mt-4 p-2 bg-blue-600 font-semibold rounded hover:bg-blue-700 transition duration-300"
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
          Don&apos;t have an account?{" "}
          <a href="/studentSignup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default StudentLogin;
