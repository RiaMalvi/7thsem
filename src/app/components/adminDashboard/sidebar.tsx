"use client";
import Image from "next/image";
import { adminNavigation } from "@/app/data/adminDashboard";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const activeRoute = usePathname();
  return (
    <aside className="w-64 bg-gray-900 text-white shadow-lg">
      <div className="p-4 flex items-center gap-4">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={50}
          height={50}
          className="rounded-full"
        />
        <h2 className="text-lg font-extrabold">Admin Portal</h2>
      </div>
      <nav className="mt-8">
        {adminNavigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`flex items-center p-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition ${
              activeRoute === item.href ? "bg-gray-700 text-white" : ""
            }`}
          >
            <item.icon className="h-6 w-6" aria-hidden="true" />
            <span className="ml-4 font-medium">{item.name}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
