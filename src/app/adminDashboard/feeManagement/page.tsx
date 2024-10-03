'use client'; // Add this line to mark the component as a Client Component

import React, { useState } from 'react';
import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  ChartBarIcon,
  DocumentDuplicateIcon,
  ClipboardDocumentListIcon,
  CogIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';

type Fee = {
  id: number;
  description: string;
  amount: number; // Ensure amount is a number
  userGroup: string; // New property for user group
  feeType: string;   // New property for fee type
  dueDate: string;   // New property for due date
};

// Sample user groups; you can modify this as needed
const userGroups = [
  'Class A',
  'Class B',
  'Class C',
  'Class D',
];

const adminNavigation = [
  { name: 'Dashboard', href: '/adminDashboard', icon: HomeIcon, current: false },
  { name: 'User Management', href: '/adminDashboard/userManagement', icon: UsersIcon, current: false },
  { name: 'Fee Management', href: '/adminDashboard/feeManagement', icon: FolderIcon, current: true },
  { name: 'Transaction Management', href: '/adminDashboard/transactionManagement', icon: DocumentDuplicateIcon, current: false },
  { name: 'Reporting & Analytics', href: '/adminDashboard/reports', icon: ChartBarIcon, current: false },
  { name: 'Notifications', href: '/adminDashboard/notifications', icon: ClipboardDocumentListIcon, current: false },
  { name: 'Settings', href: '/adminDashboard/settings', icon: CogIcon, current: false },
];

const FeeManagement = () => {
  const [fees, setFees] = useState<Fee[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number>(0); // Ensure amount is a number
  const [userGroup, setUserGroup] = useState(''); // State for user group
  const [feeType, setFeeType] = useState('');     // State for fee type
  const [dueDate, setDueDate] = useState('');     // State for due date
  const [error, setError] = useState('');

  const addFee = () => {
    if (!description || !amount || !userGroup || !feeType || !dueDate) {
      setError('Please fill in all fields.'); // Set error message if any field is empty
      return;
    }

    const newFee: Fee = {
      id: fees.length + 1,
      description,
      amount,
      userGroup,
      feeType,
      dueDate,
    };
    setFees([...fees, newFee]);
    setDescription('');
    setAmount(0); // Reset to 0 after adding
    setUserGroup(''); // Reset user group
    setFeeType('');   // Reset fee type
    setDueDate('');   // Reset due date
    setError('');     // Clear error message
  };

  const deleteFee = (id: number) => {
    setFees(fees.filter(fee => fee.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white shadow-lg">
        <div className="p-4 flex items-center gap-4">
          <Image src="/images/logo.png" alt="Logo" width={50} height={50} className="rounded-full" />
          <h2 className="text-lg font-extrabold">Admin Portal</h2>
        </div>
        <nav className="mt-8">
          {adminNavigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center p-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition ${
                item.current ? 'bg-gray-700 text-white' : ''
              }`}
            >
              <item.icon className="h-6 w-6" aria-hidden="true" />
              <span className="ml-4 font-medium">{item.name}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 text-black">
        <h1 className="text-2xl font-bold mb-4">Fee Management</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Error message display */}
        <div className="mb-4 flex-col">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Fee Description"
            className="border p-2 rounded mr-2 w-64" // Fixed padding and width
            required
          />
          <input
            type="number" // Ensure this input is for numbers
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))} // Convert string to number
            placeholder="Fee Amount"
            className="border p-2 rounded mr-2 w-32" // Fixed padding and width
            required
          />
          <select
            value={userGroup}
            onChange={(e) => setUserGroup(e.target.value)}
            className="border p-2 rounded mr-2 w-64" // Fixed padding and width
            required
          >
            <option value="" disabled>Select User Group</option>
            {userGroups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
          <input
            type="text"
            value={feeType}
            onChange={(e) => setFeeType(e.target.value)}
            placeholder="Fee Type (e.g., Tuition, Lab)"
            className="border p-2 rounded mr-2 w-64" // Fixed padding and width
            required
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border p-2 rounded mr-2 w-40" // Fixed padding and width
            required
          />
          <button
            onClick={addFee}
            className="bg-blue-500 text-white p-2 rounded" // Fixed padding
          >
            Add Fee
          </button>
        </div>

        <table className="min-w-full bg-gray-50 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200">
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Description</th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Amount</th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">User Group</th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Fee Type</th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Due Date</th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fees.map(fee => (
              <tr key={fee.id} className="hover:bg-gray-100 transition-colors duration-200">
                <td className="border-b border-gray-300 px-4 py-2">{fee.description}</td>
                <td className="border-b border-gray-300 px-4 py-2">${fee.amount}</td>
                <td className="border-b border-gray-300 px-4 py-2">{fee.userGroup}</td>
                <td className="border-b border-gray-300 px-4 py-2">{fee.feeType}</td>
                <td className="border-b border-gray-300 px-4 py-2">{fee.dueDate}</td>
                <td className="border-b border-gray-300 px-4 py-2">
                  <button onClick={() => deleteFee(fee.id)} className="text-red-500">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeeManagement;