import React, { useState } from "react";
import useFetchProperties from "../hooks/fetchData";
import axios from "axios";
import config from "../.config";


function Notifications() {
  const url = `${config.apiUrl}/api/notifications`;
  const { notifications, loading, error } = useFetchProperties(url);

  const [readStatus, setReadStatus] = useState({});
  const [selectedNotification, setSelectedNotification] = useState(null);

  const markAsRead = async (id) => {
    try {
      await axios.put(`${url}/${id}`, { data: { isRead: true } });
      setReadStatus((prev) => ({ ...prev, [id]: true }));
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const openNotification = (notification) => {
    setSelectedNotification(notification);
    if (!readStatus[notification.id]) {
      markAsRead(notification.id);
    }
  };

  const sendMessage = (type, notification) => {
    switch (type) {
      case "email":
        window.location.href = `mailto:${notification.senderEmail}?subject=Re: Notification`;
        break;
      case "whatsapp":
        window.open(`https://wa.me/${notification.senderPhone}`, "_blank");
        break;
      case "app":
        console.log("Implement in-app messaging for:", notification);
        break;
      default:
        break;
    }
  };

  if (loading) return <div>Loading notifications...</div>;
  if (error) return <div>Error loading notifications: {error.message}</div>;

  const notificationArray = Array.isArray(notifications?.data) ? notifications.data : [];
  const sortedNotifications = [...notificationArray].sort((a, b) =>
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="notifications-container">
      <div className="notification-list">
        {sortedNotifications.length === 0 ? (
          <p>No notifications available</p>
        ) : (
          sortedNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${readStatus[notification.id] ? "read" : "unread"}`}
              onClick={() => openNotification(notification)}
            >
              <div className="notification-header">
                <span>{notification.title || "New Notification"}</span>
                <span>{new Date(notification.createdAt).toLocaleDateString()}</span>
              </div>
              <p>{notification.message?.substring(0, 50)}...</p>
            </div>
          ))
        )}
      </div>

      {selectedNotification && (
        <div className="notification-details">
          <h3>{selectedNotification.title}</h3>
          <p>{selectedNotification.message}</p>
          <p>
            <small>
              Received: {new Date(selectedNotification.createdAt).toLocaleString()}
            </small>
          </p>
          <div className="notification-actions">
            <button onClick={() => sendMessage("email", selectedNotification)}>
              Email
            </button>
            <button onClick={() => sendMessage("whatsapp", selectedNotification)}>
              WhatsApp
            </button>
            <button onClick={() => sendMessage("app", selectedNotification)}>
              Reply
            </button>
            <button className="close-btn" onClick={() => setSelectedNotification(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;