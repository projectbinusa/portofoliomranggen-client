import React from "react";

const Sidebar = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-800 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Bahsanta</h1>
        </div>
        <ul className="space-y-4">
          <li>
            <a href="#" className="block py-2 px-4 hover:bg-gray-700">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 hover:bg-gray-700">
              Lamps
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 hover:bg-gray-700">
              Settings
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 hover:bg-gray-700">
              Profile
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-semibold">Welcome to Bahsanta!</h2>
        <p className="mt-4">Here you can manage your lamps and settings.</p>
      </div>
    </div>
  );
};

export default Sidebar;
