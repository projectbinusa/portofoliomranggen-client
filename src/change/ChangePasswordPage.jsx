import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../tampilan/Navbar";

export default function ChangePasswordPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 py-10 px-8 ml-64"> {/* ml-64 biar nggak nabrak sidebar */}
          <div className="bg-white rounded-lg shadow p-10 w-full max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-10">
              Change Password
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Form Password */}
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-1">Old Password</label>
                  <input
                    type="password"
                    placeholder="Enter Old Password"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter New Password"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Enter Confirm Password"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </form>

              {/* Password Rules */}
              <div>
                <h3 className="text-gray-700 font-semibold mb-4">
                  New password must contain:
                </h3>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li>— At least 8 characters</li>
                  <li>— At least 1 lower letter (a-z)</li>
                  <li>— At least 1 uppercase letter (A-Z)</li>
                  <li>— At least 1 number (0–9)</li>
                  <li>— At least 1 special characters</li>
                </ul>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-10">
              <button
                type="button"
                className="px-5 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
