import { createContext, useContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem("notifications");
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  });

  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log("📡 Status WebSocket:", isConnected);
  }, [isConnected]);

  useEffect(() => {
    console.log("📢 Notifikasi terbaru:", notifications);
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:4321/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (msg) => console.log("🔧 STOMP Debug:", msg),

      onConnect: () => {
        console.log("✅ WebSocket Connected!");
        setIsConnected(true);

        client.subscribe("/topic/notifications", (message) => {
          console.log("📩 Notifikasi diterima:", message.body);
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

  const addNotification = (message, type = "info") => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const sendNotification = (message, type = "info") => {
    if (stompClient && isConnected) {
      const notification = { message, type, timestamp: new Date().toISOString() };
      stompClient.publish({
        destination: "/app/notify",
        body: JSON.stringify(notification),
      });
    } else {
      console.warn("⚠️ STOMP client not connected. Tidak bisa mengirim notifikasi.");
    }
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, sendNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
