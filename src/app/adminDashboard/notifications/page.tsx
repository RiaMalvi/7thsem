'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import HomeIcon from '@heroicons/react/24/outline/HomeIcon';
import UsersIcon from '@heroicons/react/24/outline/UsersIcon';
import FolderIcon from '@heroicons/react/24/outline/FolderIcon';
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon';
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon';
import ClipboardDocumentListIcon from '@heroicons/react/24/outline/ClipboardDocumentListIcon';
import CogIcon from '@heroicons/react/24/outline/CogIcon';

const adminNavigation = [
    { name: 'Dashboard', href: '/adminDashboard', icon: HomeIcon, current: true },
    { name: 'User Management', href: '/adminDashboard/userManagement', icon: UsersIcon, current: false },
    { name: 'Fee Management', href: '/adminDashboard/feeManagement', icon: FolderIcon, current: false },
    { name: 'Transaction Management', href: '/adminDashboard/transactionManagement', icon: DocumentDuplicateIcon, current: false },
    { name: 'Reporting & Analytics', href: '/adminDashboard/reports', icon: ChartBarIcon, current: false },
    { name: 'Notifications', href: '/adminDashboard/notifications', icon: ClipboardDocumentListIcon, current: false },
    { name: 'Settings', href: '/adminDashboard/settings', icon: CogIcon, current: false },
  ];

// Define the structure of a notification
interface Notification {
  title: string;
  message: string;
  recipients: string;
  date: string;
}

const Notifications = () => {
  // States to manage form and notification list
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [recipients, setRecipients] = useState<string>('All');
  const [notifications, setNotifications] = useState<Notification[]>([]); // Set the type to Notification[]

  // Handler to send notification
  const handleSendNotification = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newNotification: Notification = { title, message, recipients, date: new Date().toLocaleString() };
    setNotifications([newNotification, ...notifications]);
    setTitle('');
    setMessage('');
    setRecipients('All');
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
        <h1 className="text-2xl font-bold mb-6">Notifications</h1>

        {/* Send Notification Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="font-semibold text-xl mb-4">Send New Notification</h2>
          <form onSubmit={handleSendNotification}>
            <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-1" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-1" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4} // Change this to a number type
                value={message}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-1" htmlFor="recipients">
                Recipients
              </label>
              <select
                id="recipients"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={recipients}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setRecipients(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Students">Students</option>
                <option value="Faculty">Faculty</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Send Notification
            </button>
          </form>
        </div>

        {/* View Past Notifications */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="font-semibold text-xl mb-4">Past Notifications</h2>
          {notifications.length === 0 ? (
            <p>No notifications have been sent yet.</p>
          ) : (
            <table className="w-full text-left table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Message</th>
                  <th className="px-4 py-2">Recipients</th>
                  <th className="px-4 py-2">Date Sent</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notification, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{notification.title}</td>
                    <td className="border px-4 py-2">{notification.message}</td>
                    <td className="border px-4 py-2">{notification.recipients}</td>
                    <td className="border px-4 py-2">{notification.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
