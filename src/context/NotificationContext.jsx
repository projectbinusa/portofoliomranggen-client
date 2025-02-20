import { createContext, useContext, useEffect, useState } from "react";
import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false); // ✅ Tambah state buat cek koneksi

  useEffect(() => {
    const socket = new SockJS("http://localhost:4321/ws"); // ✅ Pastikan URL WebSocket benar
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (msg) => console.log("🔧 STOMP Debug:", msg),
      onConnect: () => {
        console.log("📡 WebSocket Connected!");
        setIsConnected(true);

        client.subscribe("/topic/notifications", (message) => {
          if (message.body) {
            console.log("📩 Notifikasi Diterima:", message.body); // ✅ Debug data notifikasi

            try {
              const newNotification = JSON.parse(message.body);
              setNotifications((prev) => [
                { id: newNotification.id || Date.now(), ...newNotification }, // ✅ Gunakan ID dari server jika ada
                ...prev
              ]);
            } catch (error) {
              console.error("❌ Gagal parse notifikasi:", error);
            }
          }
        });
      },
      onDisconnect: () => {
        console.warn("⚠️ WebSocket Disconnected!");
        setIsConnected(false);
      },
      onStompError: (frame) => {
        console.error("❌ STOMP Error:", frame);
      },
      onWebSocketError: (event) => {
        console.error("🚨 WebSocket Connection Error:", event);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
      setIsConnected(false);
    };
  }, []);

  // ✅ Fungsi untuk mengirim notifikasi
  const sendNotification = (message, type = "info") => {
    if (stompClient && isConnected) { // ✅ Cek apakah STOMP sudah connect sebelum kirim notif
      const notification = { message, type, timestamp: new Date().toISOString() };
      stompClient.publish({
        destination: "/app/notify",
        body: JSON.stringify(notification),
      });
    } else {
      console.warn("⚠️ STOMP client not connected. Cannot send notification.");
    }
  };

  // ✅ Fungsi untuk menghapus notifikasi
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, sendNotification, removeNotification }}>
      {children}

      {/* 🔥 TAMPILAN NOTIFIKASI */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-3 rounded-md shadow-md text-white ${
              notif.type === "info"
                ? "bg-blue-500"
                : notif.type === "warning"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          >
            {notif.message}
            <button
              className="ml-2 text-sm text-gray-200 hover:text-white"
              onClick={() => removeNotification(notif.id)}
            >
              ✖
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
