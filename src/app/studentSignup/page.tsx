"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { instance } from "@/config/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import google from "/public/images/google.png"; // Import Google logo

interface StudentSignupData {
  email: string;
  studentId: string;
  password: string;
}

const StudentSignup = () => {
  const router = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentSignupData>({
    defaultValues: {
      email: "",
      studentId: "",
      password: "",
    },
  });

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const password = watch("password", "");
  const [error, setError] = useState<string>("");

  const onSubmit = async (data: StudentSignupData) => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await instance.post("/studentSignup", data);
      toast.success(response.data.message);
      router.push("/studentLogin");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const handleGoogleSignup = () => {
    // Simulate Google signup redirection
    toast.success("Redirecting to Google signup...");
    setTimeout(() => {
      // Replace with your actual Google signup URL or logic
      window.location.href = "https://your-google-signup-url.com";
    }, 1000); // Redirect after 1 second
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Student Signup
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-700">Student Email:</label>
            <input
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Student email is required",
                },
              })}
              required
              className="w-full p-2 mt-1 border text-gray-800 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Student ID:</label>
            <input
              type="text"
              {...register("studentId", {
                required: {
                  value: true,
                  message: "Student ID is required",
                },
              })}
              required
              className="w-full p-2 mt-1 border text-gray-800 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              {...register("password", { required: true })}
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
          <span className="font-semibold text-gray-700">
            Sign Up with Google
          </span>
        </button>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/studentLogin" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default StudentSignup;
