import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as Styled from "./style";
import logo from "../../assets/Frame.png";
import close from "../../assets/close.png";
import userImg from "../../assets/header/user.png";
import { IoMenu, IoClose, IoNotificationsSharp } from "react-icons/io5";
import { useAppContext } from "../../context/AppContext";
import { RiArrowDropDownLine } from "react-icons/ri";
import axios from "axios";
import { format } from "date-fns";
import isEmpty from "../../utils/isEmpty";
import useOutsideClick from "../../utils/useOutside";
import api from "../../configs/api";

import defaultUser from "../../assets/header/default.png";
import Notification from "../../pages/setting/notification";

const LandingHeader = () => {
  const modalRef = useRef();
  const notificationRef = useRef();
  const navigate = useNavigate();
  const locate = useLocation();
  const [context, setContext] = useAppContext();
  const [selected, onSelected] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [visiable, onVisiable] = useState(false);
  const [searchVisible, onSearchVisible] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationsVisible, setNotificationsVisible] = useState(false); // New state for notifications

  const webSocketUrl =
    process.env.NODE_ENV === "production"
      ? "wss://api.galambo.com" // Replace with your production WebSocket URL
      : "ws://localhost:4000";
  // Initialize WebSocket and handle new notifications
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://api.galambo.com" // replace with your production server URL
      : "http://localhost:4000";

  const fetchNotifications = async () => {
    try {
      const { data } = await api.get(
        `${baseUrl}/notifications?userId=${context.auth.user.id}`
      );
      // if (!response.ok) {
      //   throw new Error("Failed to fetch notifications");
      // }
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
  useEffect(() => {
    fetchNotifications();
    if (context.auth === null) return;

    const socket = new WebSocket(webSocketUrl);

    socket.onopen = () => {
      console.log("WebSocket connection opened.");
      const userId = context.auth.user.id;
      socket.send(JSON.stringify({ type: "init", userId }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.notification.type === "notification") {
        // Add the new notification to the state
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          {
            message: data.message,
            senderName: data.senderName,
            senderPhoto: data.senderPhoto,
            timestamp: new Date(data.timestamp),
          },
        ]);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, [context.auth]);

  const onSetLink = (value) => {
    setIsMobile(false);
    onSelected(value);
  };

  const logoutUser = () => {
    window.dataLayer.push({ userId: null });
    setContext({ ...context, auth: null });
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    if (context.auth !== null) {
      const getHistory = async () => {
        const data = await api.post("/manage/gethistory", {
          id: context.auth.user.id,
        });
        if (data) {
          setHistoryData(data.data.data);
        }
      };
      getHistory();
    }
  }, [context, searchVisible]);
  useOutsideClick({
    ref: modalRef,
    handler: () => onSearchVisible(false),
  });
  const handleHistorySelect = async (result) => {
    if (result) {
      navigate(`/search/${result}`);
      onSearchVisible(false);
    }
  };

  // Close notifications when clicking outside
  useOutsideClick({
    ref: notificationRef,
    handler: () => setNotificationOpen(false),
  });

  return (
    <div style={{ maxWidth: "1440px", margin: "0 auto", width: "100%" }}>
      <Styled.GlobeHeader>
        <Styled.SearchWrapper position={searchVisible ? "show" : "hide"}>
          <img
            onClick={() => onSearchVisible(false)}
            src={close}
            alt="close icon"
            width={12}
            height={12}
            style={{ position: "fixed", right: "18px", top: "18px" }}
          />
          <div ref={modalRef}>
            <p>Search History</p>
            <div>
              {!isEmpty(historyData) ? (
                historyData.history?.map((item, key) => (
                  <div key={key}>
                    <p>{format(new Date(item.date), "MM/dd/yyyy")}</p>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => handleHistorySelect(item.keyword)}
                    >
                      {item.keyword}
                    </p>
                  </div>
                ))
              ) : (
                <p>No history</p>
              )}
            </div>
          </div>
        </Styled.SearchWrapper>
        <Styled.MobileWrapper position={isMobile ? "show" : "hide"}>
          <Styled.MobileMenu>
            <IoClose
              onClick={() => setIsMobile(false)}
              size={35}
              color="#757575"
              cursor={"pointer"}
              style={{ position: "fixed", right: "10px", top: "10px" }}
            />
            <img
              itemProp="image"
              src={logo}
              alt="logo"
              width={85}
              height={14}
            />

            <Styled.MobileListWrapper>
              <Link rel="canonical" to="/" onClick={() => setIsMobile(false)}>
                <span>Home</span>
              </Link>
              <Link
                rel="canonical"
                to="/about"
                onClick={() => setIsMobile(false)}
              >
                <span>About us</span>
              </Link>
              <Link
                rel="canonical"
                to="/message"
                onClick={() => setIsMobile(false)}
              >
                <span>Message</span>
              </Link>
              {context.auth === null ? (
                <React.Fragment>
                  <Link
                    rel="canonical"
                    to="/login"
                    onClick={() => setIsMobile(false)}
                  >
                    <span>SIGN IN</span>
                  </Link>
                  <Link
                    rel="canonical"
                    to="/register"
                    onClick={() => setIsMobile(false)}
                  >
                    <span>REGISTER</span>
                  </Link>
                </React.Fragment>
              ) : (
                <Link rel="canonical" to="#" onClick={logoutUser}>
                  Log Out
                </Link>
              )}
            </Styled.MobileListWrapper>
          </Styled.MobileMenu>
        </Styled.MobileWrapper>
        <Link rel="canonical" to="/" onClick={() => onSetLink("")}>
          <img itemProp="image" src={logo} alt="logo" width={160} />
        </Link>
        <Styled.NavItem>
          <Link
            rel="canonical"
            to="/"
            onClick={() => onSetLink("")}
            className={locate.pathname === "/" ? "active-menu" : ""}
          >
            <span>Home</span>
          </Link>
          <Link
            rel="canonical"
            to="/about"
            onClick={() => onSetLink("about")}
            className={locate.pathname === "/about" ? "active-menu" : ""}
          >
            <span>About us</span>
          </Link>
          {context.auth !== null && (
            <Link
              rel="canonical"
              to="/message"
              onClick={() => onSetLink("message")}
              className={locate.pathname === "/message" ? "active-menu" : ""}
            >
              <span>Message</span>
            </Link>
          )}
        </Styled.NavItem>
        {context.auth === null ? (
          <Styled.RegisterForm>
            <Link
              rel="canonical"
              to="/login"
              onClick={() => onSetLink("login")}
              className={locate.pathname === "/login" ? "active-menu" : ""}
            >
              <span>Sign in</span>
            </Link>
            <Link
              rel="canonical"
              to="/register"
              onClick={() => onSetLink("register")}
              className={
                selected === "register" ? "active-register" : "register"
              }
            >
              <span>Sign up</span>
            </Link>
          </Styled.RegisterForm>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Styled.NotificationIcon
              onClick={() => setNotificationOpen(!isNotificationOpen)}
            >
              <IoNotificationsSharp color="black" size={34} />
              {notifications.length > 0 && (
                <Styled.NotificationBadge>
                  {notifications.length}
                </Styled.NotificationBadge>
              )}
            </Styled.NotificationIcon>

            {/* Notification Dropdown */}

            <Styled.NotificationOverlay visible={isNotificationOpen}>
              <Styled.NotificationDropdown
                ref={notificationRef}
                visible={isNotificationOpen}
              >
                <Styled.NotificationHeader>
                  <Styled.NotificationHeaderText>
                    Notifications
                  </Styled.NotificationHeaderText>
                  <IoClose
                    onClick={() => setNotificationOpen(false)}
                    color="black"
                    size={30}
                  />
                </Styled.NotificationHeader>
                <Styled.Divider />
                <Notification />
                {/* <Styled.NotificationContainer>
                  {notifications.length > 0 ? (
                    <>
                      <Styled.SectionTitle>New</Styled.SectionTitle>
                      {notifications.map((notification, index) => (
                        <Styled.NotificationItem key={index}>
                          <Styled.NotificationImage
                            src={notification.senderPhoto || defaultUser}
                            alt="Profile Picture"
                          />
                          <Styled.NotificationText>
                            <Styled.NotificationUsername>
                              {notification.senderName}
                            </Styled.NotificationUsername>
                            {notification.message}
                          </Styled.NotificationText>
                        </Styled.NotificationItem>
                      ))}
                      <Styled.SeeMore>See more</Styled.SeeMore>
                    </>
                  ) : (
                    <Styled.NoNotificationsText>
                      No new notifications
                    </Styled.NoNotificationsText>
                  )}
                </Styled.NotificationContainer> */}
              </Styled.NotificationDropdown>
            </Styled.NotificationOverlay>
            <Styled.LogoutContent>
              <Styled.LogoutWrapper onClick={() => onVisiable(!visiable)}>
                {context.profile?.photo ? (
                  <img
                    src={context.profile?.photo}
                    width={40}
                    height={40}
                    style={{
                      border: `${1}px solid gray`,
                      borderRadius: `${100}%`,
                    }}
                    alt="user-avator"
                  />
                ) : (
                  <img src={defaultUser} alt="default" width={40} height={40} />
                )}
                {/* <div>{context.auth.user.name.substring(0, 1)}</div>
              <span>{context.auth.user.name}</span> */}

                <RiArrowDropDownLine color="black" size={30} />
              </Styled.LogoutWrapper>

              <Styled.LogoutContainer
                visiable={visiable}
                onClick={() => onVisiable(!visiable)}
              >
                <Styled.AccountViewContainer>
                  <div>
                    {context.profile?.photo ? (
                      <img
                        src={context.profile?.photo}
                        width={40}
                        height={40}
                        style={{
                          border: `${1}px solid gray`,
                          borderRadius: `${100}%`,
                        }}
                        alt="user-avator"
                      />
                    ) : (
                      <img
                        src={defaultUser}
                        alt="default"
                        width={40}
                        height={40}
                      />
                    )}
                    <span>{context.auth.user.name}</span>
                  </div>
                  <button onClick={() => navigate("/profile")}>
                    View profile
                  </button>
                </Styled.AccountViewContainer>
                <Link rel="canonical" to="/profile">
                  <span>Account</span>
                </Link>
                <span onClick={() => onSearchVisible(!searchVisible)}>
                  History
                </span>
                <span onClick={logoutUser}>Logout</span>
              </Styled.LogoutContainer>
            </Styled.LogoutContent>
          </div>
        )}
        <Styled.MobileNavMenu>
          <div>
            <img
              itemProp="image"
              src={userImg}
              alt="userimage"
              width={14}
              height={17}
            />
          </div>
          <div>
            <IoMenu
              onClick={() => setIsMobile(true)}
              size={24}
              color="#757575"
              cursor={"pointer"}
            />
          </div>
        </Styled.MobileNavMenu>
        {isMobile && (
          <Styled.MobileContainer
            opac={isMobile ? "show" : "hide"}
            onClick={() => setIsMobile(false)}
          />
        )}
      </Styled.GlobeHeader>
    </div>
  );
};
export default LandingHeader;
