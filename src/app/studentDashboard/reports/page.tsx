'use client';

import { HomeIcon, UsersIcon, FolderIcon, CalendarIcon, DocumentDuplicateIcon, ChartPieIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const navigation = [
  { name: 'Dashboard', href: '/studentDashboard', icon: HomeIcon, current: false },
  { name: 'Profile', href: '/studentDashboard/profile', icon: UsersIcon, current: false },
  { name: 'Fee Details', href: '/studentDashboard/feeDetails', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '/studentDashboard/calendar', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '/studentDashboard/documents', icon: DocumentDuplicateIcon, current: false },
  { name: 'Reports', href: '/studentDashboard/reports', icon: ChartPieIcon, current: true },
];

const ReportsPage = () => {
  const semesters = Array.from({ length: 8 }, (_, i) => ({
    name: `Semester ${i + 1}`,
    reportLink: `/studentDashboard/reports/semester${i + 1}`,
    downloadLink: `/studentDashboard/reports/semester${i + 1}/download`,
  }));

  const finalYear = {
    name: "Consolidated Final Year",
    reportLink: '/studentDashboard/reports/finalYear',
    downloadLink: '/studentDashboard/reports/finalYear/download',
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white shadow-lg">
        <div className="p-4 flex items-center gap-4">
          <Image src="/images/logo.png" alt="Logo" width={50} height={50} className="rounded-full" />
          <h2 className="text-lg font-extrabold">Accounts Portal</h2>
        </div>
        <nav className="mt-8">
          {navigation.map((item) => (
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
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Academic Reports</h1>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-6 py-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Semester
                </th>
                <th className="px-6 py-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {semesters.map((semester, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm font-medium text-gray-900">
                    {semester.name}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                    <a href={semester.reportLink} className="text-indigo-600 hover:text-indigo-800 mr-4 transition">View</a>
                    <a href={semester.downloadLink} className="text-green-600 hover:text-green-800 transition">Download</a>
                  </td>
                </tr>
              ))}

              {/* Consolidated Final Year */}
              <tr className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm font-medium text-gray-900">
                  {finalYear.name}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                  <a href={finalYear.reportLink} className="text-indigo-600 hover:text-indigo-800 mr-4 transition">View</a>
                  <a href={finalYear.downloadLink} className="text-green-600 hover:text-green-800 transition">Download</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
