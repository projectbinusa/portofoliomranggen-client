import { useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

export default function ProfileNavbar() {
  const [notifications, setNotifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full max-w-screen-lg bg-white shadow-md p-4 flex justify-between items-right">
      <div className="text-xl font-bold">MyApp</div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="cursor-pointer" onClick={() => setShowNotifications(!showNotifications)}>
            <FaBell size={24} />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {notifications}
              </span>
            )}
          </div>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md p-2">
              <p className="text-sm">Anda memiliki {notifications} notifikasi</p>
              <button className="text-blue-500 mt-2" onClick={() => setNotifications(0)}>Tandai sudah dibaca</button>
            </div>
          )}
        </div>
        <div className="relative">
          <div className="cursor-pointer" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <FaUserCircle size={28} />
          </div>
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md p-2">
              <p className="text-sm cursor-pointer hover:bg-gray-100 p-2">Profil</p>
              <p className="text-sm cursor-pointer hover:bg-gray-100 p-2">Pengaturan</p>
              <p className="text-sm cursor-pointer hover:bg-gray-100 p-2">Keluar</p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
