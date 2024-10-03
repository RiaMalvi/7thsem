"use client";
// src/app/components/Header.tsx
import Image from 'next/image';

const Header = () => {
  const announcements = [
    "Fee payment deadline is 15th October.",
    "Scholarship applications are open until 20th October.",
  ];

  return (
    <div>
      <header className="flex flex-col justify-between items-center p-4 pb-0 bg-white">
        {/* Logo and Institute Name Section */}
        <div className="w-full flex justify-between items-center mb-2">
          <div className="flex-shrink-0">
            <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
          </div>
          <div className="ml-auto text-right text-black">
            <h1 className="text-lg font-bold">
              Indian Institute of Information Technology, Lucknow
            </h1>
            <p className="text-md">भारतीय सूचना प्रौद्योगिकी संस्थान, लखनऊ</p>
            <p className="text-sm">
              (An Institute of National Importance by the Act of Parliament)
            </p>
          </div>
        </div>

        
      </header>
      {/* Announcements Row */}
      <div className="w-full bg-blue-700 py-1 overflow-hidden">
          <div className="whitespace-nowrap flex animate-marquee">
            {announcements.map((announcement, index) => (
              <span key={index} className="mx-4 text-yellow-400 text-md font-semibold">
                {announcement}
              </span>
            ))}
          </div>
        </div>

        {/* Styles for marquee */}
        <style jsx>{`
          .animate-marquee {
            animation: marquee 15s linear infinite;
            }
            
            @keyframes marquee {
              0% {
                transform: translateX(100%);
                }
                100% {
                  transform: translateX(-100%);
                  }
                  }
                  `}</style>
    </div>
  );
};

export default Header;
