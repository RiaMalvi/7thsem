'use client';

import { useEffect, useState } from 'react';
import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  ChartBarIcon,
  DocumentDuplicateIcon,
  ClipboardDocumentListIcon,
  CogIcon,
} from '@heroicons/react/24/outline';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

interface User {
  id: number;
  name: string;
  role: string;
  email: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock function to simulate fetching user data
  const fetchUsers = async () => {
    // Replace with your API call
    const mockUsers: User[] = [
      { id: 1, name: 'John Doe', role: 'Student', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', role: 'Faculty', email: 'jane@example.com' },
      { id: 3, name: 'Admin User', role: 'Admin', email: 'admin@example.com' },
    ];
    setUsers(mockUsers);
    setLoading(false);
  };

  const adminNavigation = [
    { name: 'Dashboard', href: '/adminDashboard', icon: HomeIcon, current: false },
    { name: 'User Management', href: '/adminDashboard/userManagement', icon: UsersIcon, current: true },
    { name: 'Fee Management', href: '/adminDashboard/feeManagement', icon: FolderIcon, current: false },
    { name: 'Transaction Management', href: '/adminDashboard/transactionManagement', icon: DocumentDuplicateIcon, current: false },
    { name: 'Reporting & Analytics', href: '/adminDashboard/reports', icon: ChartBarIcon, current: false },
    { name: 'Notifications', href: '/adminDashboard/notifications', icon: ClipboardDocumentListIcon, current: false },
    { name: 'Settings', href: '/adminDashboard/settings', icon: CogIcon, current: false },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

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

      <div className="flex-1 p-6 text-black">
        <h1 className="text-2xl font-bold mb-6">User Management</h1>
        <Link href="/adminDashboard/userManagement/addUser">
          <button className="mb-4 flex items-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
            <PlusIcon className="h-5 w-5 mr-2" />
            Add User
          </button>
        </Link>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{user.name}</td>
                  <td className="py-3 px-6 text-left">{user.role}</td>
                  <td className="py-3 px-6 text-left">{user.email}</td>
                  <td className="py-3 px-6 text-center">
                    <Link href={`/adminDashboard/userManagement/editUser/${user.id}`}>
                      <button className="text-blue-500 hover:text-blue-700">
                        <PencilIcon className="h-5 w-5 inline" />
                      </button>
                    </Link>
                    <button className="text-red-500 hover:text-red-700 ml-4">
                      <TrashIcon className="h-5 w-5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
