import React, { useState } from "react";
import { Bell, X } from "lucide-react";
import { useNotification } from "../context/NotificationContext";

const Notifikasi = () => {
  const { notifications, removeNotification } = useNotification();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full shadow hover:bg-gray-300"
      >
        <Bell className="w-6 h-6 text-gray-600" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 w-80 mt-2 bg-white shadow-lg rounded-xl">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-700">Notifikasi</h3>
          </div>
          {notifications.length > 0 ? (
            <ul className="max-h-64 overflow-y-auto">
              {notifications.map((notif) => (
                <li
                  key={notif.id}
                  className={`p-4 border-b flex justify-between items-start ${
                    notif.type === "success"
                      ? "bg-green-50"
                      : notif.type === "warning"
                      ? "bg-yellow-50"
                      : "bg-gray-50"
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium text-gray-700">{notif.message}</p>
                    <p className="text-xs text-gray-500">{notif.time}</p>
                  </div>
                  <button
                    onClick={() => removeNotification(notif.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-sm text-gray-500">Tidak ada notifikasi baru</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifikasi;
