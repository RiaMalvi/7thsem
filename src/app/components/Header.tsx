// src/app/components/Header.tsx
import Image from 'next/image';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white ">
      {/* Logo Section */}
      <div className="flex-shrink-0">
        <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
      </div>

      {/* Text Section on Opposite End */}
      <div className="ml-auto text-right">
        <h1 className="text-lg font-bold">Indian Institute of Information Technology, Lucknow</h1>
        <p className="text-md">भारतीय सूचना प्रौद्योगिकी संस्थान, लखनऊ</p>
        <p className="text-sm">(An Institute of National Importance by the Act of Parliament)</p>
      </div>
    </header>
  );
};

export default Header;
