"use client";

import { FeeData } from "@/types/feeData";
import downloadPDF from "@/utils/generateFeeReciept";
import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

// Navigation items
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
    current: false,
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
    current: true,
  },
  {
    name: "Reports",
    href: "/studentDashboard/reports",
    icon: ChartPieIcon,
    current: false,
  },
];

// Document type interface
interface Document {
  id: number; // Unique identifier for the document
  name: string; // Document name
  url: string; // URL for downloading the document
  category: string; // Document category
}

// DocumentsPage component
const DocumentsPage = () => {
  // State for documents in different categories
  const [documents, setDocuments] = useState<{
    [key: string]: Document[];
  }>({
    "Fee Receipts": [],
    "ID Cards": [],
    Undertakings: [],
    NOCs: [],
    Miscellaneous: [],
  });

  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [currentCategory, setCurrentCategory] =
    useState<string>("Fee Receipts");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setUploadFile(files[0]);
    }
  };

  const handleUpload = () => {
    if (!uploadFile) return;

    // Create a new document object with a unique ID and a download link
    const newDocument: Document = {
      id: Date.now(), // Use timestamp as a unique ID
      name: uploadFile.name,
      url: URL.createObjectURL(uploadFile), // Temporary URL for local access
      category: currentCategory, // Set the category of the document
    };

    // Update documents state based on the current category
    setDocuments((prev) => ({
      ...prev,
      [currentCategory]: [...prev[currentCategory], newDocument],
    }));

    setUploadFile(null); // Clear the input after upload
  };

  const handleDownload = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
  };

  const feeData: FeeData = {
    student: {
      name: "John Doe",
      rollNumber: "123456",
      email: "johndoe@example.com",
    },
    semester: "Spring 2023",
    fees: [
      {
        description: "Tuition fee payment",
        transactionId: "TX12345",
        date: "2023-01-15",
        amount: 5000,
      },
      {
        description: "Library fees",
        transactionId: "TX12346",
        date: "2023-01-16",
        amount: 300,
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
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
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
          Upload Documents
        </h1>

        {/* Document Categories */}
        <div className="mb-4">
          {Object.keys(documents).map((category) => (
            <button
              key={category}
              onClick={() => setCurrentCategory(category)}
              className={`px-4 py-2 mr-2 rounded-lg ${
                currentCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* File Upload Section */}
        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="p-2 border rounded text-gray-500 border-gray-700"
          />
          <button
            onClick={handleUpload}
            className="ml-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Upload
          </button>
        </div>

        {/* Documents List */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {currentCategory}
        </h2>
        <div className="bg-white text-black shadow-md rounded-lg p-4">
          <ul>
            <li className="flex justify-between items-center mb-2">
              <span className="font-bold text-lg">
                {"Fee Reciept for Semester 1"}
              </span>
              <button
                onClick={() => downloadPDF(feeData)}
                className="text-blue-600 hover:text-blue-800"
              >
                Download
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
