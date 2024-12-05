'use client';

import { HomeIcon, UsersIcon, FolderIcon, CalendarIcon, DocumentDuplicateIcon, ChartPieIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';

// Navigation items
const navigation = [
  { name: 'Dashboard', href: '/studentDashboard', icon: HomeIcon, current: false },
  { name: 'Profile', href: '/studentDashboard/profile', icon: UsersIcon, current: false },
  { name: 'Fee Details', href: '/studentDashboard/feeDetails', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '/studentDashboard/calendar', icon: CalendarIcon, current: true },
  { name: 'Documents', href: '/studentDashboard/documents', icon: DocumentDuplicateIcon, current: false },
];

// Define the Reminder interface
interface Reminder {
  id: number; // Unique identifier for the reminder
  text: string; // Reminder text
}

// CalendarPage component
const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [reminders, setReminders] = useState<Record<string, Reminder[]>>({});
  const [newReminder, setNewReminder] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleDateClick = (day: number) => {
    const dateKey = format(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day), 'yyyy-MM-dd');
    setSelectedDate(dateKey);
    setNewReminder('');
  };

  const handleAddReminder = () => {
    if (newReminder.trim() === '' || selectedDate === null) return;

    const dateKey = selectedDate;
    const id = Date.now(); // Unique ID for the reminder
    const reminder: Reminder = { id, text: newReminder };

    setReminders((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey] ? [...prev[dateKey], reminder] : [reminder],
    }));

    setNewReminder('');
  };

  const handleDeleteReminder = (dateKey: string, id: number) => {
    setReminders((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey].filter(reminder => reminder.id !== id),
    }));
  };

  const renderCalendar = () => {
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    
    const daysInMonth = [];
    for (let i = 1; i <= endOfMonth.getDate(); i++) {
      daysInMonth.push(i);
    }

    return (
      <div className="grid grid-cols-7 gap-4 p-6">
        {daysOfWeek.map((day) => (
          <div key={day} className="font-semibold text-gray-700 text-center">
            {day}
          </div>
        ))}
        {Array.from({ length: startOfMonth.getDay() }).map((_, i) => (
          <div key={i}></div>
        ))}
        {daysInMonth.map((day) => {
          const dateKey = format(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day), 'yyyy-MM-dd');
          return (
            <div key={day} className="relative">
              <div
                onClick={() => handleDateClick(day)}
                className="p-4 bg-white border rounded-lg shadow-sm hover:bg-gray-100 transition cursor-pointer"
              >
                <span className="text-sm font-medium">{day}</span>
              </div>
              {reminders[dateKey] && reminders[dateKey].map((reminder) => (
                <div key={reminder.id} className="mt-2 text-sm bg-gray-200 p-2 rounded">
                  {reminder.text}
                  <button
                    className="ml-2 text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteReminder(dateKey, reminder.id)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white shadow-lg">
        <div className="p-4 flex items-center gap-4">
          <Image src="/images/logo.png" alt="Logo" width={50} height={50} className="rounded-full" />
          <h2 className="text-lg font-extrabold">Student Portal</h2>
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
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Academic Calendar</h1>

        {/* Calendar Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handlePrevMonth}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Previous
          </button>
          <h2 className="text-xl font-semibold text-gray-800">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <button
            onClick={handleNextMonth}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>

        {/* Add Reminder Input */}
        {selectedDate && (
          <div className="mb-4">
            <input
              type="text"
              value={newReminder}
              onChange={(e) => setNewReminder(e.target.value)}
              placeholder="Add a reminder..."
              className="p-2 border rounded text-black"
            />
            <button
              onClick={handleAddReminder}
              className="ml-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Add
            </button>
          </div>
        )}

        {/* Calendar Grid */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden text-black">
          {renderCalendar()}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
