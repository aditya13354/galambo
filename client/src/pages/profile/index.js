import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";

import { useAppContext } from "../../context/AppContext";
import defaultUser from "../../assets/header/default.png";
import * as Styled from "./style";

export default function Profile() {
  const [context, setContext] = useAppContext();
  const navigate = useNavigate();
  const logoutUser = () => {
    window.dataLayer.push({ userId: null });
    setContext({ ...context, auth: null });
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Styled.ProfileWrapper>
      <Helmet>
        <title>Profile Page | Galambo</title>
        <meta name="description" content="Profile page of galambo" />

        <link rel="canonical" href="https://www.galambo.com/profile" />
      </Helmet>

      <Styled.ProfileContainer>
        <Styled.ProfileUserInfo>
          {context.profile?.photo ? (
            <img
              src={context.profile?.photo}
              width={40}
              height={40}
              style={{ border: `${1}px solid gray`, borderRadius: `${100}%` }}
              alt="user-avator"
            />
          ) : (
            <img src={defaultUser} alt="default" width={40} height={40} />
          )}
          {context.auth !== null && (
            <Styled.ProfileContent>
              <Styled.ProfileContentHeader>
                {context.auth.user.photo ? (
                  <img src="context.auth.user.photo" alt="user-avator" />
                ) : (
                  <img src={defaultUser} alt="default" />
                )}
                <Styled.ProfileMobileContent>
                  <h1>{context.auth.user.name}</h1>
                  <div>
                    <button onClick={() => navigate("/setting")}>
                      Edit profile
                    </button>
                    <button
                      className="mobile-setting-btn"
                      onClick={() => navigate("/setting")}
                    >
                      Settings
                    </button>
                    {/* <span
                      className="setting-btn"
                      style={{
                        backgroundColor: "#001836",
                        padding: "7px",
                        borderRadius: "50px",
                        cursor: "pointer",
                      }}
                    >
                      <IoSettingsOutline size={20} color="white" />
                    </span> */}
                  </div>
                </Styled.ProfileMobileContent>
              </Styled.ProfileContentHeader>
              <Styled.ProfileContentBody>
                {/* <span>0 Searches</span> */}
                {/* <span>0 Followers</span>
                <span>0 Following</span> */}
              </Styled.ProfileContentBody>
              <span>{context.profile?.bio}</span>
              {/* <Styled.ProfileContentFooter>
                <span>Follow by</span>
                <span>Name,</span>
                <span>Name,</span>
                <span>Name</span>
                <span>+73 more</span>
              </Styled.ProfileContentFooter> */}
            </Styled.ProfileContent>
          )}
        </Styled.ProfileUserInfo>
      </Styled.ProfileContainer>
      {/* <h1 itemProp="headline">Account</h1> */}
      {/* {context.auth !== null && (
        <Styled.ProfileWrapper>
          <div>
            <span>Full Name:</span>
            <span>Email:</span>
            <span>Password:</span>
          </div>
          <div>
            <span>{context.auth.user.name}</span>
            <span>{context.auth.user.email}</span>
            <span>*******</span>
          </div>
        </Styled.ProfileWrapper>
      )} */}
      {/* <button onClick={logoutUser}>logout</button> */}
    </Styled.ProfileWrapper>
  );
}
