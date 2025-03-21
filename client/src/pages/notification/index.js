import React from "react";
import * as Styled from "./style";
import { IoClose } from "react-icons/io5";

const dummyNotifications = {
  new: [
    {
      id: 1,
      imageUrl: "https://via.placeholder.com/40",
      username: "Raymond Golphs",
      message: "has sent you a friend request",
    },
    {
      id: 2,
      imageUrl: "https://via.placeholder.com/40",
      username: "Raymond Golphs",
      message: "You and @Raymond Golphs are now friends",
    },
  ],
  lastWeek: [
    {
      id: 3,
      imageUrl: "https://via.placeholder.com/40",
      username: "Raymond Golphs",
      message: "has sent you a friend request",
    },
    {
      id: 4,
      imageUrl: "https://via.placeholder.com/40",
      username: "Raymond Golphs",
      message: "You and @Raymond Golphs are now friends",
    },
  ],
};

const Notifications = () => {
  return (
    <Styled.NotificationContainer>
      <Styled.NotificationHeader>
        <Styled.NotificationTitle>Notifications</Styled.NotificationTitle>
        <IoClose size={30} style={{ cursor: "pointer" }} />
      </Styled.NotificationHeader>

      <Styled.SectionTitle>New</Styled.SectionTitle>
      <Styled.NotificationList>
        {dummyNotifications.new.map((notification) => (
          <Styled.NotificationItem key={notification.id}>
            <Styled.ProfileImage src={notification.imageUrl} alt="Profile" />
            <Styled.NotificationContent>
              <Styled.Username>@{notification.username}</Styled.Username>{" "}
              {notification.message}
            </Styled.NotificationContent>
          </Styled.NotificationItem>
        ))}
      </Styled.NotificationList>

      <Styled.SectionTitle>Last Week</Styled.SectionTitle>
      <Styled.NotificationList>
        {dummyNotifications.lastWeek.map((notification) => (
          <Styled.NotificationItem key={notification.id}>
            <Styled.ProfileImage src={notification.imageUrl} alt="Profile" />
            <Styled.NotificationContent>
              <Styled.Username>@{notification.username}</Styled.Username>{" "}
              {notification.message}
            </Styled.NotificationContent>
          </Styled.NotificationItem>
        ))}
      </Styled.NotificationList>
    </Styled.NotificationContainer>
  );
};

export default Notifications;
