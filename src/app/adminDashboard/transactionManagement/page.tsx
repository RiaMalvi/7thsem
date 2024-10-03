'use client'; // Add this line to mark the component as a Client Component

import React, { useState } from 'react';
import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  DocumentDuplicateIcon,
  ClipboardDocumentListIcon,
  CogIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';

type Transaction = {
  id: number;
  description: string;
  amount: number;
  userGroup: string;
  transactionType: string;
  isApproved: boolean;
};

const userGroups = [
  'Class A',
  'Class B',
  'Class C',
  'Class D',
];

const transactionTypes = [
  'Purchase',
  'Sale',
  'Credit',
  'Debit',
];

const adminNavigation = [
  { name: 'Dashboard', href: '/adminDashboard', icon: HomeIcon, current: false },
  { name: 'User Management', href: '/adminDashboard/userManagement', icon: UsersIcon, current: false },
  { name: 'Fee Management', href: '/adminDashboard/feeManagement', icon: FolderIcon, current: false },
  { name: 'Transaction Management', href: '/adminDashboard/transactionManagement', icon: DocumentDuplicateIcon, current: true },
  { name: 'Notifications', href: '/adminDashboard/notifications', icon: ClipboardDocumentListIcon, current: false },
  { name: 'Settings', href: '/adminDashboard/settings', icon: CogIcon, current: false },
];

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [userGroup, setUserGroup] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const [error, setError] = useState('');

  const addTransaction = () => {
    if (!description || !amount || !userGroup || !transactionType) {
      setError('Please fill in all fields.');
      return;
    }

    const newTransaction: Transaction = {
      id: transactions.length + 1,
      description,
      amount,
      userGroup,
      transactionType,
      isApproved,
    };

    setTransactions([...transactions, newTransaction]);
    setDescription('');
    setAmount(0);
    setUserGroup('');
    setTransactionType('');
    setIsApproved(false);
    setError('');
  };

  const updateApprovalStatus = (id: number) => {
    setTransactions(transactions.map(transaction =>
      transaction.id === id
        ? { ...transaction, isApproved: !transaction.isApproved }
        : transaction
    ));
  };

  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
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
        <h1 className="text-2xl font-bold mb-4">Transaction Management</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Transaction Description"
            className="border p-2 rounded mr-2 w-64"
            required
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Amount"
            className="border p-2 rounded mr-2 w-32"
            required
          />
          <select
            value={userGroup}
            onChange={(e) => setUserGroup(e.target.value)}
            className="border p-2 rounded mr-2 w-64"
            required
          >
            <option value="" disabled>Select User Group</option>
            {userGroups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            className="border p-2 rounded mr-2 w-64"
            required
          >
            <option value="" disabled>Select Transaction Type</option>
            {transactionTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <label className="ml-2">
            <input
              type="checkbox"
              checked={isApproved}
              onChange={() => setIsApproved(!isApproved)}
              className="mr-1"
            />
            Approved
          </label>
          <button
            onClick={addTransaction}
            className="bg-blue-500 text-white p-2 rounded ml-2"
          >
            Add Transaction
          </button>
        </div>

        {/* Transactions Table */}
        <table className="min-w-full bg-gray-50 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200">
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Description</th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Amount</th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">User Group</th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Transaction Type</th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Approved</th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id} className="hover:bg-gray-100 transition-colors duration-200">
                <td className="border-b border-gray-300 px-4 py-2">{transaction.description}</td>
                <td className="border-b border-gray-300 px-4 py-2">${transaction.amount}</td>
                <td className="border-b border-gray-300 px-4 py-2">{transaction.userGroup}</td>
                <td className="border-b border-gray-300 px-4 py-2">{transaction.transactionType}</td>
                <td className="border-b border-gray-300 px-4 py-2">
                  {transaction.isApproved ? 'Yes' : 'No'}
                </td>
                <td className="border-b border-gray-300 px-4 py-2 flex gap-4">
                  <button
                    onClick={() => updateApprovalStatus(transaction.id)}
                    className={`text-white p-1 rounded ${transaction.isApproved ? 'bg-red-500' : 'bg-green-500'}`}
                  >
                    {transaction.isApproved ? 'Disapprove' : 'Approve'}
                  </button>               
                  
                  <button
                    onClick={() => deleteTransaction(transaction.id)}
                    className="text-red-700"
                  >
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

export default TransactionManagement;
