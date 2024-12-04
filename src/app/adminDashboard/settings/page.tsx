"use client"; // Marks the component as a Client Component

import React, { useState } from "react";

import Image from "next/image";
import { adminNavigation } from "@/app/data/adminDashboard";
import AdminDashboard from "../page";
import AdminSidebar from "@/app/components/adminDashboard/sidebar";

const Settings = () => {
  const [adminName, setAdminName] = useState("Admin");
  const [adminEmail, setAdminEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("");
  const [platformSettings, setPlatformSettings] = useState({
    siteTitle: "My Platform",
    maintenanceMode: false,
    allowSignups: true,
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
  });
  const [error, setError] = useState("");

  const handleProfileUpdate = () => {
    if (!adminName || !adminEmail || !password) {
      setError("Please fill in all profile fields.");
      return;
    }
    // Logic to update profile settings (API call or other mechanism)
    setError("");
    alert("Profile updated successfully!");
  };

  const handlePlatformSettingsUpdate = () => {
    // Logic to update platform settings (API call or other mechanism)
    alert("Platform settings updated successfully!");
  };

  const handleNotificationSettingsUpdate = () => {
    // Logic to update notification settings (API call or other mechanism)
    alert("Notification settings updated successfully!");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 text-black">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Profile Settings */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">Profile Settings</h2>
          <div className="mb-4">
            <input
              type="text"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              placeholder="Admin Name"
              className="border p-2 rounded mr-2 w-64"
              required
            />
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="Admin Email"
              className="border p-2 rounded mr-2 w-64"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="border p-2 rounded mr-2 w-64"
              required
            />
            <button
              onClick={handleProfileUpdate}
              className="bg-blue-500 text-white p-2 rounded ml-2"
            >
              Update Profile
            </button>
          </div>
        </section>

        {/* Platform Settings */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">Platform Settings</h2>
          <div className="mb-4">
            <input
              type="text"
              value={platformSettings.siteTitle}
              onChange={(e) =>
                setPlatformSettings({
                  ...platformSettings,
                  siteTitle: e.target.value,
                })
              }
              placeholder="Site Title"
              className="border p-2 rounded mr-2 w-64"
              required
            />
            <label className="ml-2">
              <input
                type="checkbox"
                checked={platformSettings.maintenanceMode}
                onChange={() =>
                  setPlatformSettings({
                    ...platformSettings,
                    maintenanceMode: !platformSettings.maintenanceMode,
                  })
                }
                className="mr-1"
              />
              Maintenance Mode
            </label>
            <label className="ml-4">
              <input
                type="checkbox"
                checked={platformSettings.allowSignups}
                onChange={() =>
                  setPlatformSettings({
                    ...platformSettings,
                    allowSignups: !platformSettings.allowSignups,
                  })
                }
                className="mr-1"
              />
              Allow Signups
            </label>
            <button
              onClick={handlePlatformSettingsUpdate}
              className="bg-blue-500 text-white p-2 rounded ml-2"
            >
              Update Settings
            </button>
          </div>
        </section>

        {/* Notification Settings */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">Notification Settings</h2>
          <div className="mb-4">
            <label className="ml-2">
              <input
                type="checkbox"
                checked={notificationSettings.emailNotifications}
                onChange={() =>
                  setNotificationSettings({
                    ...notificationSettings,
                    emailNotifications:
                      !notificationSettings.emailNotifications,
                  })
                }
                className="mr-1"
              />
              Email Notifications
            </label>
            <label className="ml-4">
              <input
                type="checkbox"
                checked={notificationSettings.smsNotifications}
                onChange={() =>
                  setNotificationSettings({
                    ...notificationSettings,
                    smsNotifications: !notificationSettings.smsNotifications,
                  })
                }
                className="mr-1"
              />
              SMS Notifications
            </label>
            <button
              onClick={handleNotificationSettingsUpdate}
              className="bg-blue-500 text-white p-2 rounded ml-2"
            >
              Update Notifications
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
