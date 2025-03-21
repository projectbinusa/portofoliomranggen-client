import { } from "react-router-dom";

export default function ChangePasswordPage() {
  

  return (
    <div className="flex h-screen bg-gray-100 p-6">
      {/* Sidebar Profil */}
      <div className="w-1/4 bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col items-center">
          <img 
            src="https://avatars.dicebear.com/api/adventurer/your-avatar.svg" 
            alt="Profile" 
            className="w-24 h-24 rounded-full"
          />
          <h2 className="text-lg font-semibold mt-2">Stebin Ben</h2>
          <p className="text-sm text-gray-500">Full Stack Developer</p>

          {/* Sosial Media */}
          <div className="flex gap-3 mt-3">
            <button className="text-red-500 text-xl">🔴</button>
            <button className="text-blue-500 text-xl">🔵</button>
            <button className="text-black text-xl">⚫</button>
          </div>

          {/* Statistik */}
          <div className="mt-4 flex gap-6 text-center">
            <div>
              <p className="text-xl font-bold">86</p>
              <p className="text-gray-500 text-sm">Post</p>
            </div>
            <div>
              <p className="text-xl font-bold">40</p>
              <p className="text-gray-500 text-sm">Project</p>
            </div>
            <div>
              <p className="text-xl font-bold">4.5K</p>
              <p className="text-gray-500 text-sm">Members</p>
            </div>
          </div>

          {/* Menu Navigasi */}
          <button className="mt-6 px-4 py-2 w-full bg-blue-100 text-blue-600 rounded-md">
            Change Password
          </button>
        </div>
      </div>

      {/* Konten Change Password */}
      <div className="w-3/4 bg-white p-6 ml-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>

        {/* Form Password */}
        <div className="space-y-4">
          <div>
            <label className="text-gray-700">Old Password</label>
            <input 
              type="password" 
              placeholder="Enter Old Password"
              className="w-full p-2 border rounded mt-1"
            />
          </div>

          <div>
            <label className="text-gray-700">New Password</label>
            <input 
              type="password" 
              placeholder="Enter New Password"
              className="w-full p-2 border rounded mt-1"
            />
          </div>

          <div>
            <label className="text-gray-700">Confirm Password</label>
            <input 
              type="password" 
              placeholder="Enter Confirm Password"
              className="w-full p-2 border rounded mt-1"
            />
          </div>
        </div>

        {/* Password Requirements */}
        <div className="mt-6">
          <h3 className="text-gray-700 font-semibold">New password must contain:</h3>
          <ul className="text-gray-600 mt-2 space-y-1">
            <li>— At least 8 characters</li>
            <li>— At least 1 lower letter (a-z)</li>
            <li>— At least 1 uppercase letter (A-Z)</li>
            <li>— At least 1 number (0-9)</li>
            <li>— At least 1 special character</li>
          </ul>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-between mt-6">
          <button 

            className="border px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
