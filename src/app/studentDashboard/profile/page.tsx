// pages/studentDashboard/profile/index.tsx
'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { HomeIcon, UsersIcon, FolderIcon, CalendarIcon, DocumentDuplicateIcon, ChartPieIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const navigation = [
  { name: 'Dashboard', href: '/studentDashboard', icon: HomeIcon, current: false },
  { name: 'Profile', href: '/studentDashboard/profile', icon: UsersIcon, current: true },
  { name: 'Fee Details', href: '/studentDashboard/feeDetails', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '/studentDashboard/calendar', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '/studentDashboard/documents', icon: DocumentDuplicateIcon, current: false },
  { name: 'Reports', href: '/studentDashboard/reports', icon: ChartPieIcon, current: false },
];

const Profile = () => {
  const [profile, setProfile] = useState<{
    name: string;
    email: string;
    phone: string;
    studentId: string;
    batch: string;
    currentSemester: string;
    enrollmentNumber: string;
    parentsName: string;
    address: string;
    branch: string;
    photo: File | null;
  }>({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    studentId: 'IIIT1234',
    batch: '2022',
    currentSemester: '6',
    enrollmentNumber: 'ENR2022-0001',
    parentsName: 'Jane Doe',
    address: '123 Main St, City, Country',
    branch: 'Computer Science',
    photo: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfile((prevProfile) => ({
      ...prevProfile,
      photo: file,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Updated Profile:', profile);
    alert('Profile updated successfully!');
    setIsModalOpen(false); // Close the modal after submitting
  };

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
        <h1 className="text-2xl font-bold mb-6">Student Profile</h1>
        
        {/* Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Name</h2>
            <p>{profile.name}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Email</h2>
            <p>{profile.email}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Phone Number</h2>
            <p>{profile.phone}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Batch</h2>
            <p>{profile.batch}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Current Semester</h2>
            <p>{profile.currentSemester}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Enrollment Number</h2>
            <p>{profile.enrollmentNumber}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Parent&apos;s Name</h2>
            <p>{profile.parentsName}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Address</h2>
            <p>{profile.address}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Branch</h2>
            <p>{profile.branch}</p>
          </div>
        </div>

        {/* Update Profile Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Update Profile
        </button>

        {/* Update Profile Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Update Profile</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" placeholder="Name" value={profile.name} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded-md" required />
                <input type="email" name="email" placeholder="Email" value={profile.email} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded-md" required />
                <input type="tel" name="phone" placeholder="Phone Number" value={profile.phone} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded-md" required />
                <input type="text" name="batch" placeholder="Batch" value={profile.batch} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded-md" required />
                <input type="text" name="currentSemester" placeholder="Current Semester" value={profile.currentSemester} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded-md" required />
                <input type="text" name="enrollmentNumber" placeholder="Enrollment Number" value={profile.enrollmentNumber} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded-md" required />
                <input type="text" name="parentsName" placeholder="Parent's Name" value={profile.parentsName} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded-md" required />
                <textarea name="address" placeholder="Address" value={profile.address} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded-md" required></textarea>
                <input type="text" name="branch" placeholder="Branch" value={profile.branch} onChange={handleChange} className="block w-full p-2 border border-gray-300 rounded-md" required />
                <input type="file" name="photo" onChange={handleFileChange} className="block w-full border border-gray-300 rounded-md" />

                <div className="flex justify-between mt-4">
                  <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-red-500 text-white rounded">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
