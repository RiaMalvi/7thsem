// src/app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'IIIT Lucknow Accounts',
  description: 'Login portal for students, employees, and admins',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="">
        <div className="min-h-screen flex flex-col ">
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
