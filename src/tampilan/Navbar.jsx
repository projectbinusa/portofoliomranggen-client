import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Bell, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";

export default function ProfileNavbar() {
  const { notifications, removeNotification } = useNotification();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // 🔥 Tambahin useEffect buat debug notifikasi
  useEffect(() => {
    console.log("📢 Notifikasi terbaru:", notifications);
  }, [notifications]);

  // 🔥 Pastikan dark mode ngikutin sistem
  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(isDark);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-[260px] w-[calc(100%-260px)] p-3 flex justify-between items-center z-50 
      ${darkMode ? "bg-gray-900 text-white shadow-lg" : "bg-white text-black shadow-md"}`}
    >
      <div className="text-xl font-bold">MyApp</div>
      <div className="flex items-center gap-4">
        
        {/* 🔔 Notifikasi di Navbar */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative flex items-center justify-center w-10 h-10 rounded-full shadow-md
            ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            <Bell className={`w-6 h-6 ${darkMode ? "text-white" : "text-gray-600"}`} />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>

          {/* 🔥 Modal Notifikasi */}
          {showNotifications && (
            <div
              className={`absolute right-0 top-12 w-80 max-h-60 rounded-xl z-50 overflow-y-auto border 
              ${darkMode ? "bg-gray-800 text-white border-gray-700 shadow-lg" : "bg-white text-black border-gray-200 shadow-xl"}`}
            >
              {/* Header Notifikasi */}
              <div className={`flex justify-between items-center p-3 border-b 
              ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"}`}>
                <h3 className="text-sm font-semibold">Notifikasi</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className={`hover:text-red-500 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Daftar Notifikasi */}
              <ul className="overflow-auto max-h-48">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <li
                      key={notif.id}
                      className={`flex justify-between items-center p-3 border-b text-sm
                      ${notif.type === "success" ? "bg-green-50 text-green-700" : ""}
                      ${notif.type === "warning" ? "bg-yellow-50 text-yellow-700" : ""}
                      ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-50 text-gray-800"}`}
                    >
                      <div>
                        <strong className="capitalize">{notif.type}</strong>: {notif.message}
                        <br />
                        <small className="text-gray-500">
                          {notif.timestamp ? new Date(notif.timestamp).toLocaleString() : "Baru saja"}
                        </small>
                      </div>
                      <button
                        onClick={() => removeNotification(notif.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </li>
                  ))
                ) : (
                  <div className="p-3 text-center text-xs text-gray-500">Tidak ada notifikasi baru</div>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* 👤 Profil */}
        <div className="relative">
          <div
            className="cursor-pointer"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <FaUserCircle size={28} className={darkMode ? "text-white" : "text-gray-800"} />
          </div>
          {showProfileMenu && (
            <div className={`absolute right-0 top-12 w-40 border rounded shadow-md p-2 
              ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-200"}`}>
              <Link to="/page-profil" className="text-sm cursor-pointer hover:bg-gray-100 p-2 block">
                Profil
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
