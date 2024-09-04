import React from 'react';

const UserSettings = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
      <form className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700">Notification Preferences</label>
          <select className="w-full p-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Email Notifications</option>
            <option>Push Notifications</option>
            <option>Both</option>
            <option>None</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Theme</label>
          <select className="w-full p-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Light</option>
            <option>Dark</option>
            <option>System Default</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default UserSettings;
