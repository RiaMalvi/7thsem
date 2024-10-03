'use client';

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

const adminNavigation = [
  { name: 'Dashboard', href: '/adminDashboard', icon: HomeIcon, current: true },
  { name: 'User Management', href: '/adminDashboard/userManagement', icon: UsersIcon, current: false },
  { name: 'Fee Management', href: '/adminDashboard/feeManagement', icon: FolderIcon, current: false },
  { name: 'Transaction Management', href: '/adminDashboard/transactionManagement', icon: DocumentDuplicateIcon, current: false },
  { name: 'Reporting & Analytics', href: '/adminDashboard/reports', icon: ChartBarIcon, current: false },
  { name: 'Notifications', href: '/adminDashboard/notifications', icon: ClipboardDocumentListIcon, current: false },
  { name: 'Settings', href: '/adminDashboard/settings', icon: CogIcon, current: false },
];

const AdminDashboard = () => {
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
        <h1 className="text-2xl font-bold mb-6">Welcome to the Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: User Statistics */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="font-semibold text-lg">User Statistics</h2>
            <table className="min-w-full mt-4 bg-gray-50 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Metric</th>
                  <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100 transition-colors duration-200">
                  <td className="border-b border-gray-300 px-4 py-2">Total Users</td>
                  <td className="border-b border-gray-300 px-4 py-2">1500</td>
                </tr>
                <tr className="hover:bg-gray-100 transition-colors duration-200">
                  <td className="border-b border-gray-300 px-4 py-2">Active Users</td>
                  <td className="border-b border-gray-300 px-4 py-2">1200</td>
                </tr>
                <tr className="hover:bg-gray-100 transition-colors duration-200">
                  <td className="border-b border-gray-300 px-4 py-2">New Registrations</td>
                  <td className="border-b border-gray-300 px-4 py-2">50</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Card 2: Fee Overview */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="font-semibold text-lg">Fee Overview</h2>
            <table className="min-w-full mt-4 bg-gray-50 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Description</th>
                  <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100 transition-colors duration-200">
                  <td className="border-b border-gray-300 px-4 py-2">Total Fees Collected</td>
                  <td className="border-b border-gray-300 px-4 py-2">$50,000</td>
                </tr>
                <tr className="hover:bg-gray-100 transition-colors duration-200">
                  <td className="border-b border-gray-300 px-4 py-2">Pending Payments</td>
                  <td className="border-b border-gray-300 px-4 py-2">$5,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Card 3: Recent Notifications */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="font-semibold text-lg">Recent Notifications</h2>
            <table className="min-w-full mt-4 bg-gray-50 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Date</th>
                  <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Notification</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100 transition-colors duration-200">
                  <td className="border-b border-gray-300 px-4 py-2">Oct 1, 2024</td>
                  <td className="border-b border-gray-300 px-4 py-2">New fee structure published.</td>
                </tr>
                <tr className="hover:bg-gray-100 transition-colors duration-200">
                  <td className="border-b border-gray-300 px-4 py-2">Oct 2, 2024</td>
                  <td className="border-b border-gray-300 px-4 py-2">System maintenance scheduled for Oct 10.</td>
                </tr>
                <tr className="hover:bg-gray-100 transition-colors duration-200">
                  <td className="border-b border-gray-300 px-4 py-2">Oct 3, 2024</td>
                  <td className="border-b border-gray-300 px-4 py-2">Update on student project submissions.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Card 4: Transaction Summary */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="font-semibold text-lg">Transaction Summary</h2>
            <table className="min-w-full mt-4 bg-gray-50 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Description</th>
                  <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Count</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100 transition-colors duration-200">
                  <td className="border-b border-gray-300 px-4 py-2">Total Transactions</td>
                  <td className="border-b border-gray-300 px-4 py-2">200</td>
                </tr>
                <tr className="hover:bg-gray-100 transition-colors duration-200">
                  <td className="border-b border-gray-300 px-4 py-2">Refunds Processed</td>
                  <td className="border-b border-gray-300 px-4 py-2">5</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Card 5: Quick Actions */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="font-semibold text-lg">Quick Actions</h2>
            <ul className="list-disc list-inside mt-4">
              <li>
                <a href="/adminDashboard/userManagement" className="text-blue-600 hover:underline">
                  Manage Users
                </a>
              </li>
              <li>
                <a href="/adminDashboard/feeManagement" className="text-blue-600 hover:underline">
                  Manage Fees
                </a>
              </li>
              <li>
                <a href="/adminDashboard/notifications" className="text-blue-600 hover:underline">
                  Send Notifications
                </a>
              </li>
            </ul>
          </div>

          {/* Card 6: System Health */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="font-semibold text-lg">System Health</h2>
            <table className="min-w-full mt-4 bg-gray-50 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Status</th>
                  <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100 transition-colors duration-200">
                  <td className="border-b border-gray-300 px-4 py-2">System Status</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-green-600">All systems operational</td>
                </tr>
                <tr className="hover:bg-gray-100 transition-colors duration-200">
                  <td className="border-b border-gray-300 px-4 py-2">Last Checked</td>
                  <td className="border-b border-gray-300 px-4 py-2">Oct 2, 2024</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
