import React, { useState, useCallback, useContext } from "react";
import { UserContext } from "../context/UserContext";
import useFetchProperties from "../hooks/fetchData";
import axios from "axios";
import config from "../.config";
import PropTypes from "prop-types";

// Removed DisplayPropertyPhotos component entirely since we're not displaying photos
// Helper function to construct the sentence remains unchanged
const buildRequestSentence = (selectedRequest) => {
  const fields = [
    { key: "requestType", prefix: "Moving" },
    { key: "locationFrom", prefix: "from" },
    { key: "locationTo", prefix: "to" },
    { key: "movingDate", prefix: "on" },
    { key: "countryOfOrigin", prefix: "originating from" },
    { key: "destinationCountry", prefix: "destined for" },
    { key: "itemsDescription", prefix: "with items including" },
    { key: "numberOfRooms", prefix: "for", suffix: "rooms" },
    { key: "currentOfficeAddress", prefix: "from the current office at" },
    { key: "newOfficeAddress", prefix: "to the new office at" },
    { key: "storageLocation", prefix: "with storage at" },
    { key: "storageItemsDescription", prefix: "storing" },
    { key: "additionDetails", prefix: "with additional details:" },
    { key: "petName", prefix: "with a pet named" },
    { key: "statusCode", prefix: "currently" },
  ];

  const sentenceParts = fields
    .filter(
      (field) =>
        selectedRequest[field.key] &&
        selectedRequest[field.key].toString().trim() !== ""
    )
    .map((field) => {
      const value = selectedRequest[field.key];
      const formattedValue = field.suffix ? `${value} ${field.suffix}` : value;
      return `${field.prefix} ${formattedValue}`;
    });

  return sentenceParts.length > 0
    ? `${sentenceParts.join(", ")}.`
    : "No request details available.";
};

const Notifications = () => {
  const { token } = useContext(UserContext);
  const notificationUrl = `${config.apiUrl}/api/notifications?populate=*`;

  const { notifications, loading, error } = useFetchProperties(notificationUrl, token);

  const [readStatus, setReadStatus] = useState({});
  const [selectedNotification, setSelectedNotification] = useState(null);

  const markAsRead = useCallback(
    async (id) => {
      try {
        console.log("Attempting to mark as read, ID:", id);
        const configHeaders = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        await axios.put(
          `${config.apiUrl}/api/notifications/${id}`,
          { data: { isRead: true } },
          configHeaders
        );
        setReadStatus((prev) => ({ ...prev, [id]: true }));
        console.log("Successfully marked as read, ID:", id);
      } catch (err) {
        console.error("Error marking notification as read:", err.message, err.response?.data);
      }
    },
    [token]
  );

  const handleOpenNotification = useCallback(
    (notification) => {
      console.log("Selected Notification:", notification);
      const notificationId = notification.id;
      if (!notificationId) {
        console.error("Invalid notification ID:", notification);
        return;
      }
      setSelectedNotification(notification);
      if (!readStatus[notificationId]) {
        markAsRead(notificationId);
      }
    },
    [readStatus, markAsRead]
  );

  const handleSendMessage = useCallback((type, notification) => {
    switch (type) {
      case "email":
        window.location.href = `mailto:${notification.senderEmail}?subject=Re: ${notification.title || "Notification"}`;
        break;
      case "whatsapp":
        window.open(`https://wa.me/${notification.senderPhone}`, "_blank");
        break;
      case "app":
        console.log("In-app message to:", notification);
        break;
      default:
        break;
    }
  }, []);

  if (loading) return <div className="loading">Loading notifications...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  console.log("Fetched Notifications:", notifications);

  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  console.log("Sorted Notifications:", sortedNotifications);

  const selectedRequest = selectedNotification?.request || null;
  console.log("Selected Request:", selectedRequest);

  return (
    <div className="notifications-container">
      <div className="notification-list">
        {sortedNotifications.length === 0 ? (
          <p className="no-notifications">No notifications available</p>
        ) : (
          sortedNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${readStatus[notification.id] ? "read" : "unread"}`}
              onClick={() => handleOpenNotification(notification)}
              role="button"
              tabIndex={0}
            >
              <div className="notification-header">
                <p>{notification.title || "New Notification"}</p>
                <span className="date">
                  <em>{new Date(notification.createdAt).toLocaleDateString()}</em>
                </span>
              </div>
              <p className="preview">
                {notification.message?.substring(0, 50)}...
              </p>
            </div>
          ))
        )}
      </div>

      {selectedNotification && (
        <div className="notification-details">
          <h4>{selectedNotification.title}</h4>
          <p className="message">{selectedNotification.message}</p>
          {selectedRequest ? (
            <p>{buildRequestSentence(selectedRequest)}</p>
          ) : (
            <p>No related request found.</p>
          )}
          <p className="sender">From: {selectedNotification.sender}</p>
          <p className="timestamp">
            <small>
              Received: {new Date(selectedNotification.createdAt).toLocaleString()}
            </small>
          </p>
          <div className="notification-actions">
            <button onClick={() => handleSendMessage("email", selectedNotification)}>
              Email
            </button>
            <button onClick={() => handleSendMessage("whatsapp", selectedNotification)}>
              WhatsApp
            </button>
            <button onClick={() => handleSendMessage("app", selectedNotification)}>
              Reply
            </button>
            <button
              className="close-btn"
              onClick={() => setSelectedNotification(null)}
              aria-label="Close notification"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Removed PropTypes since DisplayPropertyPhotos component is removed

export default Notifications;