'use client'; // Marks the component as a Client Component

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

const adminNavigation = [
    { name: 'Dashboard', href: '/adminDashboard', icon: HomeIcon, current: false },
    { name: 'User Management', href: '/adminDashboard/userManagement', icon: UsersIcon, current: false },
    { name: 'Fee Management', href: '/adminDashboard/feeManagement', icon: FolderIcon, current: false },
    { name: 'Transaction Management', href: '/adminDashboard/transactionManagement', icon: DocumentDuplicateIcon, current: false },
    { name: 'Notifications', href: '/adminDashboard/notifications', icon: ClipboardDocumentListIcon, current: false },
    { name: 'Settings', href: '/adminDashboard/settings', icon: CogIcon, current: true },
  ];

const Settings = () => {
  const [adminName, setAdminName] = useState('Admin');
  const [adminEmail, setAdminEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('');
  const [platformSettings, setPlatformSettings] = useState({
    siteTitle: 'My Platform',
    maintenanceMode: false,
    allowSignups: true,
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
  });
  const [error, setError] = useState('');

  const handleProfileUpdate = () => {
    if (!adminName || !adminEmail || !password) {
      setError('Please fill in all profile fields.');
      return;
    }
    // Logic to update profile settings (API call or other mechanism)
    setError('');
    alert('Profile updated successfully!');
  };

  const handlePlatformSettingsUpdate = () => {
    // Logic to update platform settings (API call or other mechanism)
    alert('Platform settings updated successfully!');
  };

  const handleNotificationSettingsUpdate = () => {
    // Logic to update notification settings (API call or other mechanism)
    alert('Notification settings updated successfully!');
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
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Profile Settings */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">Profile Settings</h2>
          <div className="mb-4">
            <input
              type="text"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              placeholder="Admin Name"
              className="border p-2 rounded mr-2 w-64"
              required
            />
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="Admin Email"
              className="border p-2 rounded mr-2 w-64"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="border p-2 rounded mr-2 w-64"
              required
            />
            <button
              onClick={handleProfileUpdate}
              className="bg-blue-500 text-white p-2 rounded ml-2"
            >
              Update Profile
            </button>
          </div>
        </section>

        {/* Platform Settings */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">Platform Settings</h2>
          <div className="mb-4">
            <input
              type="text"
              value={platformSettings.siteTitle}
              onChange={(e) =>
                setPlatformSettings({ ...platformSettings, siteTitle: e.target.value })
              }
              placeholder="Site Title"
              className="border p-2 rounded mr-2 w-64"
              required
            />
            <label className="ml-2">
              <input
                type="checkbox"
                checked={platformSettings.maintenanceMode}
                onChange={() =>
                  setPlatformSettings({
                    ...platformSettings,
                    maintenanceMode: !platformSettings.maintenanceMode,
                  })
                }
                className="mr-1"
              />
              Maintenance Mode
            </label>
            <label className="ml-4">
              <input
                type="checkbox"
                checked={platformSettings.allowSignups}
                onChange={() =>
                  setPlatformSettings({
                    ...platformSettings,
                    allowSignups: !platformSettings.allowSignups,
                  })
                }
                className="mr-1"
              />
              Allow Signups
            </label>
            <button
              onClick={handlePlatformSettingsUpdate}
              className="bg-blue-500 text-white p-2 rounded ml-2"
            >
              Update Settings
            </button>
          </div>
        </section>

        {/* Notification Settings */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">Notification Settings</h2>
          <div className="mb-4">
            <label className="ml-2">
              <input
                type="checkbox"
                checked={notificationSettings.emailNotifications}
                onChange={() =>
                  setNotificationSettings({
                    ...notificationSettings,
                    emailNotifications: !notificationSettings.emailNotifications,
                  })
                }
                className="mr-1"
              />
              Email Notifications
            </label>
            <label className="ml-4">
              <input
                type="checkbox"
                checked={notificationSettings.smsNotifications}
                onChange={() =>
                  setNotificationSettings({
                    ...notificationSettings,
                    smsNotifications: !notificationSettings.smsNotifications,
                  })
                }
                className="mr-1"
              />
              SMS Notifications
            </label>
            <button
              onClick={handleNotificationSettingsUpdate}
              className="bg-blue-500 text-white p-2 rounded ml-2"
            >
              Update Notifications
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
