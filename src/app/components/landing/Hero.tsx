import React from "react";

const Hero = () => {
  return (
    <div className="bg-gray-50">
      <div className="max-w-6xl mx-auto py-16 px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl tracking-wide">
          Welcome to the Accounts Department!
        </h1>
        <p className="mt-4 text-lg leading-7 text-gray-600">
          At the Indian Institute of Information Technology, Lucknow, we are
          committed to providing efficient financial services for our students,
          faculty, and staff. Our online portal enables you to manage your
          financial transactions seamlessly, ensuring transparency and ease of
          access.
        </p>

        <div className="mt-6 flex items-center gap-x-6">
          <button className="rounded-md bg-blue-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {" "}
            Get Started
          </button>

          <button className="rounded-md bg-gray-300 px-3.5 py-2.5 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"> 
            Learn More
            </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
