'use client';

import { HomeIcon, UsersIcon, FolderIcon, CalendarIcon, DocumentDuplicateIcon, ChartPieIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const navigation = [
  { name: 'Dashboard', href: '/studentDashboard', icon: HomeIcon, current: true },
  { name: 'Profile', href: '/studentDashboard/profile', icon: UsersIcon, current: false },
  { name: 'Fee Details', href: '/studentDashboard/feeDetails', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '/studentDashboard/calendar', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '/studentDashboard/documents', icon: DocumentDuplicateIcon, current: false },
  { name: 'Reports', href: '/studentDashboard/reports', icon: ChartPieIcon, current: false },
];

const StudentDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4 flex items-center gap-4">
            <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
          <h2 className="text-lg font-bold">Accounts Portal</h2>
        </div>
        <nav className="mt-5">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white">
              <item.icon className="h-5 w-5" aria-hidden="true" />
              <span className="ml-3">{item.name}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 text-black">
        <h1 className="text-2xl font-bold mb-6">Welcome to the Student Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 2: Profile */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="font-semibold text-lg">Profile</h2>
            <p className="text-gray-600">Update your personal information.</p>
            <a href="/studentDashboard/profile" className="text-blue-500 mt-2 block">Go to Profile</a>
          </div>

          {/* Card 1: Fee Details */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="font-semibold text-lg">Fee Details</h2>
            <p className="text-gray-600">View and manage your fee payments.</p>
            <a href="/studentDashboard/feeDetails" className="text-blue-500 mt-2 block">Go to Fee Details</a>
          </div>

          {/* Card 5: Calendar */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="font-semibold text-lg">Calendar</h2>
            <p className="text-gray-600">Check important dates and deadlines.</p>
            <a href="/studentDashboard/calendar" className="text-blue-500 mt-2 block">Go to Calendar</a>
          </div>

          {/* Card 3: Documents */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="font-semibold text-lg">Documents</h2>
            <p className="text-gray-600">Access your important documents.</p>
            <a href="/studentDashboard/documents" className="text-blue-500 mt-2 block">Go to Documents</a>
          </div>

          {/* Card 4: Reports */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="font-semibold text-lg">Reports</h2>
            <p className="text-gray-600">View your academic reports.</p>
            <a href="/studentDashboard/reports" className="text-blue-500 mt-2 block">Go to Reports</a>
          </div>

          {/* Card 6: Help */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="font-semibold text-lg">Help</h2>
            <p className="text-gray-600">Get assistance with your queries.</p>
            <a href="/studentDashboard/help" className="text-blue-500 mt-2 block">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;