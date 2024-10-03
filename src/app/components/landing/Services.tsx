"use client"; // Mark this component as a Client Component

import React from 'react';
import { FaUsers } from "react-icons/fa";
import { BsBriefcaseFill } from "react-icons/bs";
import { FaBuildingShield } from "react-icons/fa6";
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

// Define a type for services
type Service = {
  name: string;
  description: string;
  href: string;
  icon: React.ElementType; // Use ElementType for icon type
};

const services: Service[] = [
  {
    name: 'Student Portal',
    description:
      'The student portal allows students to pay their fees, access financial records, and check reminders posted by the accounts department. Only students and the accounts department have access to this portal.',
    href: '/studentLogin', // Path for Student Login
    icon: FaUsers,
  },
  {
    name: 'Employee Portal',
    description:
      'The employee portal is designed for faculty and staff to access their salary details and related financial information. Both employees and the accounts department have access to this portal.',
    href: '/employeeLogin', // Path for Employee Login
    icon: BsBriefcaseFill,
  },
  {
    name: 'Admin Portal',
    description:
      'The admin portal is restricted to the accounts department for managing financial transactions, and it has control over the other two portals. It also handles posting reminders and announcements.',
    href: '/adminLogin', // Path for Admin Login
    icon: FaBuildingShield,
  },
];

const Services: React.FC = () => {
  const router = useRouter(); // Initialize useRouter

  // Function to handle navigation
  const handleRedirect = (href: string) => {
    router.push(href); // Redirect to the respective page
  };

  return (
    <div className="bg-white p-16">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-800">Manage Financials Efficiently</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
            Portals for Students, Employees, and Admin
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Each portal is designed to cater to specific users, allowing easy access and management of financial transactions and records for students, employees, and the accounts department.
          </p>
        </div>
        <div className="mx-auto max-w-2xl mt-10 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-4 gap-x-10 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {services.map((feature) => (
              <div
                key={feature.name}
                className="flex flex-col p-4 border-2 border-gray-400 rounded-lg cursor-pointer hover:bg-blue-50 transition duration-300"
                onClick={() => handleRedirect(feature.href)} // Handle redirect on click
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 p-2">
                  <feature.icon aria-hidden="true" className="h-5 w-5 flex-none text-blue-700" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 p-2">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Services;
