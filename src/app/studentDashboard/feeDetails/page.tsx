"use client";
import { useState } from "react";
import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

interface Payment {
  transactionDate: string;
  paymentMethod: string;
  transactionId: string;
  remarks: string;
  semester: string;
  amount: number;
}

interface GroupedPayments {
  [semester: string]: Payment[];
}

const navigation = [
  { name: "Dashboard", href: "/studentDashboard", icon: HomeIcon, current: false },
  { name: "Profile", href: "/studentDashboard/profile", icon: UsersIcon, current: false },
  { name: "Fee Details", href: "/studentDashboard/feeDetails", icon: FolderIcon, current: true },
  { name: "Calendar", href: "/studentDashboard/calendar", icon: CalendarIcon, current: false },
  { name: "Documents", href: "/studentDashboard/documents", icon: DocumentDuplicateIcon, current: false },
  { name: "Reports", href: "/studentDashboard/reports", icon: ChartPieIcon, current: false },
];

const FeeDetails = () => {
  // Sample data for fees and payment history
  const [paymentStatus] = useState({
    paidAmount: 20000,
    pendingAmount: 30000,
    status: "Pending",
  });

  // Sample payment history data
  const [paymentHistory] = useState<Payment[]>([
    {
      transactionDate: "2024-09-01",
      paymentMethod: "Online Transfer",
      transactionId: "TXN001",
      remarks: "Tuition fee payment",
      semester: "Semester 1",
      amount: 30000,
    },
    {
      transactionDate: "2024-09-15",
      paymentMethod: "Cash",
      transactionId: "TXN002",
      remarks: "Library fees",
      semester: "Semester 1",
      amount: 5000,
    },
    {
      transactionDate: "2024-09-20",
      paymentMethod: "Online Transfer",
      transactionId: "TXN003",
      remarks: "Hostel fees",
      semester: "Semester 1",
      amount: 5000,
    },
    {
      transactionDate: "2024-09-25",
      paymentMethod: "Cheque",
      transactionId: "TXN004",
      remarks: "Laboratory fees",
      semester: "Semester 1",
      amount: 10000,
    },
    {
      transactionDate: "2024-09-30",
      paymentMethod: "Online Transfer",
      transactionId: "TXN005",
      remarks: "Extra-curricular activities fees",
      semester: "Semester 1",
      amount: 5000,
    },
    {
      transactionDate: "2025-01-05",
      paymentMethod: "Online Transfer",
      transactionId: "TXN006",
      remarks: "Tuition fee payment",
      semester: "Semester 2",
      amount: 30000,
    },
    {
      transactionDate: "2025-01-10",
      paymentMethod: "Cash",
      transactionId: "TXN007",
      remarks: "Library fees",
      semester: "Semester 2",
      amount: 5000,
    },
  ]);

  // Sample upcoming payments
  const upcomingPayments = [
    { dueDate: "2024-12-31", amount: 30000 },
    { dueDate: "2025-03-15", amount: 20000 },
  ];

  // Group payments by semester
  const groupedPayments = paymentHistory.reduce<GroupedPayments>((acc, payment) => {
    (acc[payment.semester] = acc[payment.semester] || []).push(payment);
    return acc;
  }, {});

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
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Fee Details</h1>

        {/* First Row: Payment Status and Upcoming Payments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Payment Status */}
          <div className="bg-white p-6 rounded-lg shadow text-black">
            <h2 className="text-xl font-semibold mb-4">Payment Status</h2>
            <p><strong>Paid Amount:</strong> ₹{paymentStatus.paidAmount}</p>
            <p><strong>Pending Amount:</strong> ₹{paymentStatus.pendingAmount}</p>
            <p>
              <strong>Status:</strong> 
              <span className={paymentStatus.status === "Paid" ? "text-green-600" : "text-red-600"}>
                {paymentStatus.status}
              </span>
            </p>
          </div>

          {/* Upcoming Payments */}
          <div className="bg-white p-6 rounded-lg shadow text-black">
            <h2 className="text-xl font-semibold mb-4">Upcoming Payments</h2>
            {upcomingPayments.map((payment, index) => (
              <p key={index} className="mb-2">Due Date: {payment.dueDate}, Amount: ₹{payment.amount}</p>
            ))}
          </div>
        </div>

        {/* Semester-wise Fee Tables */}
        {Object.entries(groupedPayments).map(([semester, payments]) => (
          <div key={semester} className="bg-white p-6 rounded-lg shadow text-black mb-6">
            <h2 className="text-xl font-semibold mb-4">{semester}</h2>
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Fee Description</th>
                  <th className="border border-gray-300 p-2">Transaction ID</th>
                  <th className="border border-gray-300 p-2">Date</th>
                  <th className="border border-gray-300 p-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2">{payment.remarks}</td>
                    <td className="border border-gray-300 p-2">{payment.transactionId}</td>
                    <td className="border border-gray-300 p-2">{payment.transactionDate}</td>
                    <td className="border border-gray-300 p-2">₹{payment.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        {/* Payment History */}
        <div className="bg-white p-6 rounded-lg shadow text-black mb-6">
          <h2 className="text-xl font-semibold mb-4">Payment History</h2>
          <div className="relative">
            <div className="border-l-2 border-gray-300 pl-6">
              {paymentHistory.map((payment, index) => (
                <div key={index} className="mb-8 flex items-start relative">
                  {/* Icon for each event */}
                  <div className="absolute left-[-12px] top-1 flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white">
                    {index === paymentHistory.length - 1 ? (
                      <span className="text-md">✔</span>
                    ) : (
                      <span className="text-md">👍</span>
                    )}
                  </div>
                  {/* Payment details */}
                  <div className="ml-6">
                    <p className="font-medium text-gray-600">{payment.transactionDate}</p>
                    <p className="text-gray-800">
                      <strong>{payment.remarks}</strong> via {payment.paymentMethod}
                    </p>
                    <p className="text-sm text-gray-500">Transaction ID: {payment.transactionId}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeDetails;
