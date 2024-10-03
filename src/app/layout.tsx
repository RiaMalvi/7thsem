// src/app/layout.tsx
"use-client";
import './globals.css';
import { Toaster } from 'react-hot-toast'; // Import Toaster

export const metadata = {
  title: 'IIIT Lucknow Accounts',
  description: 'Login portal for students, employees, and admins',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="">
        <div className="min-h-screen flex flex-col">
          <Toaster /> {/* Add Toaster here */}
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
