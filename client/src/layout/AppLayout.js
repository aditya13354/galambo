import React, { useEffect, useState } from "react";
import LandingHeader from "./LandingHeader/header";
import styled from "styled-components";
import { Navigation } from "../components/navigation";
import cookie from "../assets/cookie.png";
const LandingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  margin: 0 auto;
  /* background-color: #f5f5f5; */
`;
const CookieContainer = styled.div`
  z-index: 1000;
  position: fixed;
  bottom: 100px;
  left: 10px;
  display: ${(props) => (props.visible ? "flex" : "none")};
  @media screen and (max-width: 425px) {
    bottom: 10px;
    span {
      max-width: 223px !important;
      box-sizing: border-box;
      font-size: 10px;
      display: inline-block;
      padding: 0 23px 0 5px !important;
    }
  }
  background-color: #2d2d2d;
  color: white;
  padding: 11px 20px;
  border-radius: 50px;
  span {
    max-width: 236px;
    display: block;
    padding: 0 23px;
    font-size: 13px;
  }
  button {
    cursor: pointer;
    outline: none;
    width: 98px;
    height: 35px;
    color: #2d2d2d;
    background-color: white;
    border-radius: 40px;
    border: none;
  }
`;
const LandingLayout = (props) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("galambo-cookie")) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, []);

  console.log(props);

  return (
    <LandingWrapper>
      <LandingHeader />
      {props.children}
      {!props.fdisable && <Navigation />}
      <CookieContainer visible={visible}>
        <img
          itemProp="image"
          src={cookie}
          alt="cookie image"
          width={34}
          height={34}
        />
        <span>
          We use cookies to ensure you get the best experience on our website.
        </span>
        <button
          onClick={() => {
            localStorage.setItem("galambo-cookie", true);
            setVisible(!visible);
          }}
        >
          Accept
        </button>
      </CookieContainer>
    </LandingWrapper>
  );
};

export default LandingLayout;
