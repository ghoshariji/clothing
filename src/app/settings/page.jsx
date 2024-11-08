"use client";
import React, { useState } from "react";
import Image from "next/image";
import Page from "../_footer/Page";
import Authnavbar from "";

function SettingsPage() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    avatar: "/avatar.png", // Avatar image
  });

  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    setUser(updatedUser);
    setEditMode(false);
  };

  return (
    <>
    <Authnavbar />
    <div className="min-h-screen bg-white-100 dark:bg-white-900 flex flex-col items-center py-10 px-5">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <Image
            src={user.avatar}
            alt="User Avatar"
            height={100}
            width={100}
            className="rounded-full mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            {user.name}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
          <button
            onClick={() => setEditMode(!editMode)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-gray-600 dark:text-gray-300">Full Name</label>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={updatedUser.name}
                onChange={handleChange}
                className="mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              />
            ) : (
              <p className="mt-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
                {user.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-600 dark:text-gray-300">Email</label>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
                className="mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              />
            ) : (
              <p className="mt-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
                {user.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="text-gray-600 dark:text-gray-300">Phone</label>
            {editMode ? (
              <input
                type="text"
                name="phone"
                value={updatedUser.phone}
                onChange={handleChange}
                className="mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              />
            ) : (
              <p className="mt-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
                {user.phone}
              </p>
            )}
          </div>

          {/* Avatar URL */}
          <div className="flex flex-col">
            <label className="text-gray-600 dark:text-gray-300">Avatar URL</label>
            {editMode ? (
              <input
                type="text"
                name="avatar"
                value={updatedUser.avatar}
                onChange={handleChange}
                className="mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              />
            ) : (
              <p className="mt-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
                {user.avatar}
              </p>
            )}
          </div>
        </div>

        {/* Save Button */}
        {editMode && (
          <div className="mt-6 text-right">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
 
    </div>
    <Page/>
    </>
    
  );
}

export default SettingsPage;
