import React, { useState, useEffect } from "react";
import * as Styled from "./style";
import { useAppContext } from "../../context/AppContext";
import api from "../../configs/api";
import defaultUser from "../../assets/header/default.png";

// Utility function to check if a date is within the last 7 days
const isWithinLastWeek = (date) => {
  const currentDate = new Date();
  const notificationDate = new Date(date);
  const diffInDays = (currentDate - notificationDate) / (1000 * 60 * 60 * 24);
  return diffInDays <= 7;
};
const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [context] = useAppContext();

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://api.galambo.com"
      : "http://localhost:4000";

  // Function to fetch notifications
  const fetchNotifications = async () => {
    try {
      const { data } = await api.get(
        `${baseUrl}/notifications?userId=${context.auth.user.id}`
      );
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const respondToRequest = async (from, to, status) => {
    try {
      await api.post(`${baseUrl}/chat/friend-respond`, { from, to, status });
      fetchNotifications();
    } catch (error) {
      console.error("Error responding to request:", error);
    }
  };

  useEffect(() => {
    fetchNotifications(); // Initial fetch

    const webSocketUrl =
      process.env.NODE_ENV === "production"
        ? "wss://api.galambo.com"
        : "ws://localhost:4000";
    const socket = new WebSocket(webSocketUrl);

    socket.onopen = () => {
      console.log("WebSocket connected.");
      socket.send(
        JSON.stringify({ type: "init", userId: context.auth.user.id })
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.notification.type === "notification") {
        setNotifications((prev) => {
          // Add only if the notification doesn't already exist
          if (
            !prev.some(
              (notif) =>
                notif.message === data.notification.message &&
                notif.timestamp === data.timestamp
            )
          ) {
            return [
              ...prev,
              {
                message: data.notification.message,
                senderName: data.notification.senderName,
                senderPhoto: data.notification.senderPhoto,
                timestamp: new Date(data.timestamp),
                isRead: false,
              },
            ];
          }
          return prev;
        });
      }
    };

    socket.onerror = (error) => console.error("WebSocket error:", error);
    socket.onclose = () => console.log("WebSocket connection closed");

    return () => {
      socket.close();
    };
  }, [context.auth.user.id]);

  // Split notifications into "New" and "Last Week"
  const newNotifications = notifications.filter((notif) =>
    isWithinLastWeek(notif.timestamp)
  );
  const lastWeekNotifications = notifications.filter(
    (notif) => !isWithinLastWeek(notif.timestamp)
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* <Styled.NotificationTitle>Notifications</Styled.NotificationTitle> */}
      <Styled.NotificationContainer>
        {notifications.length > 0 ? (
          <>
            {newNotifications.length > 0 && (
              <Styled.NotificationSection>
                <Styled.NotificatinSectionTitle>
                  New
                </Styled.NotificatinSectionTitle>
                {newNotifications.map((notif, index) => (
                  <Styled.Notification key={index}>
                    <Styled.NotifcationAvatar
                      src={notif.senderPhoto ? notif.senderPhoto : defaultUser}
                      alt={notif.senderName}
                    />
                    <Styled.NotificationMessage>
                      <strong>{notif.senderName}:</strong> {notif.message}
                    </Styled.NotificationMessage>
                  </Styled.Notification>
                ))}
              </Styled.NotificationSection>
            )}
            {lastWeekNotifications.length > 0 && (
              <Styled.NotificationSection>
                <Styled.NotificatinSectionTitle>
                  Last Week
                </Styled.NotificatinSectionTitle>
                {lastWeekNotifications.map((notif, index) => (
                  <Styled.Notification key={index}>
                    <Styled.NotifcationAvatar
                      src={
                        notif.senderPhoto
                          ? process.env.REACT_APP_BACKEND_API +
                            notif.senderPhoto
                          : defaultUser
                      }
                      alt={notif.senderName}
                    />

                    <Styled.NotificationMessage>
                      <p
                        dangerouslySetInnerHTML={{ __html: notif.message }}
                      ></p>
                      {/* <strong>{notif.senderName}:</strong> {notif.message} */}
                    </Styled.NotificationMessage>
                    {/* {notif.message.includes("friend request") && (
                      <Styled.ActionButtons>
                        <Styled.AcceptButton
                          onClick={() =>
                            respondToRequest(
                              notif._id,
                              notif.userId,
                              "accepted"
                            )
                          }
                        >
                          Accept
                        </Styled.AcceptButton>
                        <Styled.RejectButton
                          onClick={() =>
                            respondToRequest(notif._id, "rejected")
                          }
                        >
                          Reject
                        </Styled.RejectButton>
                      </Styled.ActionButtons>
                    )} */}
                  </Styled.Notification>
                ))}
              </Styled.NotificationSection>
            )}
          </>
        ) : (
          <Styled.NotificationMessage>
            Currently, you don't have new notifications
          </Styled.NotificationMessage>
        )}
      </Styled.NotificationContainer>
    </div>
  );
};

export default Notification;
