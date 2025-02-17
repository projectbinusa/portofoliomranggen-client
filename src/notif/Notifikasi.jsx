import React, { useState } from "react";
import { Bell, X } from "lucide-react";
import { useNotification } from "../context/NotificationContext";

const Notifikasi = () => {
  const { notifications, removeNotification } = useNotification();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Tombol Bel Notifikasi */}
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

      {/* Modal Notifikasi Mengambang */}
      {isOpen && (
        <div className="fixed right-0 top-16 w-[36rem] max-h-80 bg-white shadow-xl rounded-xl z-50 overflow-hidden border border-gray-200">
          {/* Header Notifikasi */}
          <div className="flex justify-between items-center p-4 border-b bg-gray-100">
            <h3 className="text-lg font-semibold text-gray-700">Notifikasi</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Daftar Notifikasi */}
          <div className="max-h-60 overflow-y-auto">
            {notifications.length > 0 ? (
              <table className="w-auto ml-auto text-right text-sm text-gray-700">
                <thead className="bg-gray-200 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="pr-4 py-2">Pesan</th>
                    <th className="pr-4 py-2">Waktu</th>
                    <th className="pr-4 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map((notif) => (
                    <tr
                      key={notif.id}
                      className={`border-b ${
                        notif.type === "success"
                          ? "bg-green-50"
                          : notif.type === "warning"
                          ? "bg-yellow-50"
                          : "bg-gray-50"
                      }`}
                    >
                      <td className="pr-4 py-2">{notif.message}</td>
                      <td className="pr-4 py-2 text-gray-500">{notif.time}</td>
                      <td className="pr-4 py-2">
                        <button
                          onClick={() => removeNotification(notif.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-4 text-center text-sm text-gray-500">
                Tidak ada notifikasi baru
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifikasi;
