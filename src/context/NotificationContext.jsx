import { createContext, useContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

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
          if (message.body) {
            console.log("📩 Notifikasi Diterima:", message.body);
            try {
              const newNotification = JSON.parse(message.body);
              setNotifications((prev) => [
                { id: newNotification.id || Date.now(), ...newNotification },
                ...prev,
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

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, sendNotification, removeNotification }}
    >
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

// ✅ Tambahkan ekspor NotificationContext agar bisa digunakan di file lain
export const useNotification = () => useContext(NotificationContext);
export { NotificationContext };
