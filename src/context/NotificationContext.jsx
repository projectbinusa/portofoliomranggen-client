import React, { createContext, useContext, useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const clientRef = React.useRef(null);

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:4321/ws",
      onConnect: () => {
        console.log("🔗 Connected to WebSocket");

        client.subscribe("/topic/notifications", (message) => {
          const newNotification = JSON.parse(message.body);
          setNotifications((prev) => [newNotification, ...prev]);
        });

        client.subscribe("/topic/notifications/delete", (message) => {
          const deletedId = JSON.parse(message.body).id;
          setNotifications((prev) => prev.filter((notif) => notif.id !== deletedId));
        });
      },
      onStompError: (frame) => {
        console.error("❌ WebSocket Error: ", frame);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, []);

  const sendNotification = async (message, type) => {
    try {
      await fetch("http://localhost:4321/api/notification/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, type }),
      });
    } catch (error) {
      console.error("❌ Gagal mengirim notifikasi:", error);
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, sendNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
