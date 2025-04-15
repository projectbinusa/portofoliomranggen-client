import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Bell, X, List } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";

export default function ProfileNavbar() {
  const { notifications, removeNotification } = useNotification();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-[260px] w-[calc(100%-260px)] p-3 flex justify-between items-center bg-white text-black shadow-md z-50">
      <div className="text-xl font-bold">MyApp</div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <button onClick={() => setShowNotifications(!showNotifications)} className="relative flex items-center justify-center w-10 h-10 rounded-full shadow-md bg-gray-200 hover:bg-gray-300">
            <Bell className="w-6 h-6 text-gray-600" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                {notifications.length > 9 ? "9+" : notifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-96 bg-white border rounded-lg shadow-lg z-50">
              <div className="flex justify-between items-center px-4 py-3 bg-gray-100 border-b">
                <h3 className="text-sm font-semibold">Notifikasi</h3>
                <button onClick={() => setShowNotifications(false)} className="hover:text-red-500 text-gray-500">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-72 overflow-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-2 border">Pesan</th>
                      <th className="p-2 border">Waktu</th>
                      <th className="p-2 border">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <tr key={notif.id} className="border hover:bg-gray-100">
                          <td className="p-2 border">{notif.message}</td>
                          <td className="p-2 border text-gray-500">
                            {new Date(notif.timestamp).toLocaleTimeString()}
                          </td>
                          <td className="p-2 border text-center">
                            <button onClick={() => removeNotification(notif.id)} className="text-red-500 hover:text-red-700">
                              <X className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="p-4 text-center text-gray-500">Tidak ada notifikasi baru</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-gray-100 text-center">
                <button className="text-blue-500 text-sm font-semibold hover:underline">Mark all read</button>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <div className="cursor-pointer" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <FaUserCircle size={28} className="text-gray-800" />
          </div>
          {showProfileMenu && (
            <div className="absolute right-0 top-12 w-40 border rounded shadow-md p-2 bg-white text-black">
              <Link to="/page-profil" className="text-sm cursor-pointer hover:bg-gray-100 p-2 block">Profil</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
