import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import { HiOutlinePencil, HiOutlineArrowDownOnSquare } from "react-icons/hi2";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";

import { useAppContext } from "../../context/AppContext";

import EditPorfile from "./profile";
import AccountPrivacy from "./account-privacy";

import * as Styled from "./style";
import Notification from "./notification";

export default function Profile() {
  const [context, setContext] = useAppContext();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(0);

  const settingList = [
    {
      icon: <HiOutlinePencil size={20} />,
      title: "Edit Profile",
    },
    {
      icon: <IoNotificationsOutline size={20} />,
      title: "Notification",
    },
    {
      icon: <MdLockOutline size={20} />,
      title: "Account Privacy",
    },
  ];

  const logoutUser = () => {
    window.dataLayer.push({ userId: null });
    setContext({ ...context, auth: null });
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Styled.SettingWrapper>
      <Helmet>
        <title>Profile Page | Galambo</title>
        <meta name="description" content="Profile page of galambo" />

        <link rel="canonical" href="https://www.galambo.com/profile" />
      </Helmet>
      <Styled.SettingContainer>
        <Styled.SettingSliebar>
          <h1>Setting</h1>
          <div>
            {settingList.map((item, key) => (
              <span
                key={key}
                className={menu === key && "setting-active"}
                onClick={() => setMenu(key)}
              >
                {item.icon}
                {item.title}
              </span>
            ))}
            <span onClick={logoutUser}>
              <HiOutlineArrowDownOnSquare size={20} />
              Log out
            </span>
          </div>
        </Styled.SettingSliebar>
        <Styled.SettingTabContainer>
          {settingList.map((item, key) => (
            <Styled.SettingTabItem
              key={key}
              className={menu === key && "tab-active"}
              onClick={() => setMenu(key)}
            >
              {item.title}
            </Styled.SettingTabItem>
          ))}
        </Styled.SettingTabContainer>
        <Styled.SettingContent>
          {menu === 0 && <EditPorfile />}
          {menu === 1 && <Notification />}
          {menu === 2 && <AccountPrivacy />}
        </Styled.SettingContent>
      </Styled.SettingContainer>
    </Styled.SettingWrapper>
  );
}
