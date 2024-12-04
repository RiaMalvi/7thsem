"use client";

import { adminNavigation } from "@/app/data/adminDashboard";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AdminSidebar from "@/app/components/adminDashboard/sidebar";

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
      { id: 1, name: "John Doe", role: "Student", email: "john@example.com" },
      { id: 2, name: "Jane Smith", role: "Faculty", email: "jane@example.com" },
      { id: 3, name: "Admin User", role: "Admin", email: "admin@example.com" },
    ];
    setUsers(mockUsers);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <AdminSidebar />
      <div className="flex-1 p-6 text-black">
        <h1 className="text-2xl font-bold mb-6">Faculty Management</h1>
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
                <tr
                  key={user.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{user.name}</td>
                  <td className="py-3 px-6 text-left">{user.role}</td>
                  <td className="py-3 px-6 text-left">{user.email}</td>
                  <td className="py-3 px-6 text-center">
                    <Link
                      href={`/adminDashboard/userManagement/editUser/${user.id}`}
                    >
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
