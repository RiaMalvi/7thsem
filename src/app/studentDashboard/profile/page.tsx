"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { instance } from "@/config/axios";
import { useStudent } from "@/providers/Student";

const navigation = [
  {
    name: "Dashboard",
    href: "/studentDashboard",
    icon: HomeIcon,
    current: false,
  },
  {
    name: "Profile",
    href: "/studentDashboard/profile",
    icon: UsersIcon,
    current: true,
  },
  {
    name: "Fee Details",
    href: "/studentDashboard/feeDetails",
    icon: FolderIcon,
    current: false,
  },
  {
    name: "Calendar",
    href: "/studentDashboard/calendar",
    icon: CalendarIcon,
    current: false,
  },
  {
    name: "Documents",
    href: "/studentDashboard/documents",
    icon: DocumentDuplicateIcon,
    current: false,
  },
  {
    name: "Reports",
    href: "/studentDashboard/reports",
    icon: ChartPieIcon,
    current: false,
  },
];

const Profile = () => {
  const [student, setStudent] = useState<any>(null);
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
    name: student?.name || "Robert Brown",
    email: "robert.brown@example.com",
    phone: "123-456-7890",
    studentId: student?.studentId || "LCI003",
    batch: "2024",
    currentSemester: "1",
    enrollmentNumber: student?.studentId || "LCI003",
    parentsName: "Jane Doe",
    address: "123 Main St, City, Country",
    branch: "Computer Science",
    photo: null,
  });

  const [isLoading, setIsLoading] = useState(true);
  const { student: studentData, loading } = useStudent();
  console.log(studentData);

  useEffect(() => {
    try {
      instance.post("/api/student", { _id: studentData?._id }).then((res) => {
        setStudent(res.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.error("Error getting student", error);
      setIsLoading(false);
    }
  }, [studentData]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    console.log("Updated Profile:", profile);
    alert("Profile updated successfully!");
    setIsModalOpen(false); // Close the modal after submitting
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white shadow-lg">
        <div className="p-4 flex items-center gap-4">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <h2 className="text-lg font-extrabold">Accounts Portal</h2>
        </div>
        <nav className="mt-8">
          {navigation.map((item) => (
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

      {/* Main Content */}
      <div className="flex-1 p-6 text-black">
        <h1 className="text-2xl font-bold mb-6">Student Profile</h1>

        {/* Profile Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left side - Profile Picture and Actions */}
          <div className="bg-white p-4 rounded shadow flex flex-col items-center justify-center ">
            <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
              {/* Placeholder Image */}
              {profile.photo ? (
                <Image
                  src={URL.createObjectURL(profile.photo)}
                  alt="Profile"
                  width={128}
                  height={128}
                />
              ) : (
                <Image
                  src="/images/avatar.png"
                  alt="Profile"
                  width={128}
                  height={128}
                />
              )}
            </div>
            <h2 className="text-lg font-semibold mb-2">{profile.name}</h2>
          </div>

          {/* Right side - Profile Information */}
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Full Name", value: profile.name },
                { label: "Email", value: profile.email },
                { label: "Phone Number", value: profile.phone },
                { label: "Batch", value: profile.batch },
                { label: "Current Semester", value: profile.currentSemester },
                { label: "Enrollment Number", value: profile.enrollmentNumber },
                { label: "Parent's Name", value: profile.parentsName },
                { label: "Address", value: profile.address },
                { label: "Branch", value: profile.branch },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white p-3 rounded shadow">
                  <h2 className="text-md font-semibold">{label}</h2>
                  <p className="text-sm">{value}</p>
                </div>
              ))}
            </div>

            {/* Update Profile Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Update Profile
            </button>
          </div>
        </div>

        {/* Update Profile Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-4 w-full max-w-2xl">
              {" "}
              {/* Increased width */}
              <h2 className="text-xl font-bold mb-2">Update Profile</h2>
              <form onSubmit={handleSubmit} className="space-y-2">
                <label className=" text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={profile.name}
                  onChange={handleChange}
                  className=" w-full p-1 border border-gray-300 rounded-md text-sm"
                  required
                />

                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={profile.email}
                  onChange={handleChange}
                  className="block w-full p-1 border border-gray-300 rounded-md text-sm"
                  required
                />

                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="block w-full p-1 border border-gray-300 rounded-md text-sm"
                  required
                />

                <label className="block text-sm font-medium text-gray-700">
                  Batch
                </label>
                <input
                  type="text"
                  name="batch"
                  placeholder="Batch"
                  value={profile.batch}
                  onChange={handleChange}
                  className="block w-full p-1 border border-gray-300 rounded-md text-sm"
                  required
                />

                <label className="block text-sm font-medium text-gray-700">
                  Current Semester
                </label>
                <input
                  type="text"
                  name="currentSemester"
                  placeholder="Current Semester"
                  value={profile.currentSemester}
                  onChange={handleChange}
                  className="block w-full p-1 border border-gray-300 rounded-md text-sm"
                  required
                />

                <label className="block text-sm font-medium text-gray-700">
                  Enrollment Number
                </label>
                <input
                  type="text"
                  name="enrollmentNumber"
                  placeholder="Enrollment Number"
                  value={profile.enrollmentNumber}
                  onChange={handleChange}
                  className="block w-full p-1 border border-gray-300 rounded-md text-sm"
                  required
                />

                <label className="block text-sm font-medium text-gray-700">
                  Parent&apos;s Name
                </label>
                <input
                  type="text"
                  name="parentsName"
                  placeholder="Parent's Name"
                  value={profile.parentsName}
                  onChange={handleChange}
                  className="block w-full p-1 border border-gray-300 rounded-md text-sm"
                  required
                />

                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  name="address"
                  placeholder="Address"
                  value={profile.address}
                  onChange={handleChange}
                  className="block w-full p-1 border border-gray-300 rounded-md text-sm"
                  required
                ></textarea>

                <label className="block text-sm font-medium text-gray-700">
                  Branch
                </label>
                <input
                  type="text"
                  name="branch"
                  placeholder="Branch"
                  value={profile.branch}
                  onChange={handleChange}
                  className="block w-full p-1 border border-gray-300 rounded-md text-sm"
                  required
                />

                <label className="block text-sm font-medium text-gray-700">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full p-1 border border-gray-300 rounded-md text-sm"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md"
                >
                  Submit
                </button>
              </form>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 w-full bg-gray-500 text-white py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
