'use client';

import Image from 'next/image';
import HomeIcon from '@heroicons/react/24/outline/HomeIcon';
import UsersIcon from '@heroicons/react/24/outline/UsersIcon';
import FolderIcon from '@heroicons/react/24/outline/FolderIcon';
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon';
import ClipboardDocumentListIcon from '@heroicons/react/24/outline/ClipboardDocumentListIcon';
import CogIcon from '@heroicons/react/24/outline/CogIcon';

const adminNavigation = [
    { name: 'Dashboard', href: '/adminDashboard', icon: HomeIcon, current: false },
    { name: 'User Management', href: '/adminDashboard/userManagement', icon: UsersIcon, current: false },
    { name: 'Fee Management', href: '/adminDashboard/feeManagement', icon: FolderIcon, current: false },
    { name: 'Transaction Management', href: '/adminDashboard/transactionManagement', icon: DocumentDuplicateIcon, current: false },
    { name: 'Notifications', href: '/adminDashboard/notifications', icon: ClipboardDocumentListIcon, current: false },
    { name: 'Settings', href: '/adminDashboard/settings', icon: CogIcon, current: true },
  ];

const Settings = () => {
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
                item.current ? "bg-gray-700 text-white" : ""
              }`}
            >
              <item.icon className="h-6 w-6" aria-hidden="true" />
              <span className="ml-4 font-medium">{item.name}</span>
            </a>
          ))}
        </nav>
      </aside>

      <div className="flex-1 p-6 text-black">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        {/* Add sections for configuring portal settings, payment gateways, and user permissions */}
      </div>
    </div>
  );
};

export default Settings;
