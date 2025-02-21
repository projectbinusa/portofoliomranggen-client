import { createContext, useContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    // 🔥 Load dari localStorage saat pertama kali dijalankan
    const savedNotifications = localStorage.getItem("notifications");
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  });

  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log("📡 Status WebSocket:", isConnected);
  }, [isConnected]);

  useEffect(() => {
    console.log("📢 Notifikasi terbaru di state:", notifications);
    // 🔥 Simpan ke localStorage setiap ada perubahan notifikasi
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:4321/ws"); // Sesuaikan URL WebSocket
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (msg) => console.log("🔧 STOMP Debug:", msg),
      onConnect: () => {
        console.log("📡 WebSocket Connected!");
        setIsConnected(true);

        client.subscribe("/topic/notifications", (message) => {
          console.log("📩 Notifikasi diterima dari server:", message.body);
          try {
            const newNotification = JSON.parse(message.body);
            setNotifications((prev) => [
              { id: newNotification.id || Date.now(), ...newNotification },
              ...prev,
            ]);
          } catch (error) {
            console.error("❌ Gagal parse notifikasi:", error);
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

  // ✅ Fungsi untuk menambah notifikasi ke state
  const addNotification = (message, type = "info") => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  // ✅ Fungsi untuk mengirim notifikasi ke backend
  const sendNotification = (message, type = "info") => {
    if (stompClient && isConnected) {
      const notification = {
        message,
        type,
        timestamp: new Date().toISOString(),
      };
      stompClient.publish({
        destination: "/app/notify",
        body: JSON.stringify(notification),
      });
    } else {
      console.warn("⚠️ STOMP client not connected. Cannot send notification.");
    }
  };

  // ✅ Fungsi untuk menghapus notifikasi dari UI
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, sendNotification, removeNotification }}
    >
      {children}

      {/* 🔥 UI Notifikasi */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-3 rounded-md shadow-md text-white ${
              notif.type === "info"
                ? "bg-blue-500"
                : notif.type === "success"
                ? "bg-green-500"
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

// ✅ Hook untuk menggunakan context di komponen lain
export const useNotification = () => useContext(NotificationContext);
export { NotificationContext };
