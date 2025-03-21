import styled from "styled-components";
export const GlobeHeader = styled.div`
  /* max-width: 1440px;
  margin: auto; */
  /* width: 100%; */
  padding: 38px 70px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media screen and (max-width: 1024px) {
    padding: 56px 28px 20px 28px;
  }
  * {
    font-size: 13px !important;
  }
  & > a {
    /* margin-left: 20px; */
    @media screen and (max-width: 768px) {
      img {
        width: 126px !important;
      }
    }
  }
`;
export const NavItem = styled.div`
  /* margin-left: 50px; */
  display: flex;
  align-items: flex-start;
  & > a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    background-color: #e6e6e6;
    color: #000000;
    margin-right: 20px;
  }
  /* & > a:first-child {
    background-color: ${(props) =>
    props.selected === "" ? "#2D2D2D" : "#E6E6E6"};
    span {
      color: ${(props) => (props.selected === "" ? "#FFFFFF" : "#000000")};
    }

    margin-right: 20px;
  }
  & > a:nth-child(2) {
    background-color: ${(props) =>
    props.selected === "about" ? "#2D2D2D" : "#E6E6E6"};
    span {
      color: ${(props) => (props.selected === "about" ? "#FFFFFF" : "#000000")};
    }
  } */
  a {
    width: 98px;
    height: 35px;
    border-radius: 50px;
    text-decoration: none;
    span {
      font-size: 13px;
      font-weight: 400;
      cursor: pointer;
    }
  }

  img {
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const Border = styled.div`
  height: 6px;
  border-radius: 88px;
  background-color: black;
`;
export const RegisterForm = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
  position: relative;
  height: 45px;
  display: flex;

  align-items: center;
  justify-content: center;
  a {
    width: 98px;
    height: 35px;
    border-radius: 76px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    font-family: Poppins;
    background-color: #e6e6e6;
    margin-right: 20px;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      font-weight: bold;
    }
  }
  a {
    background-color: transparent;
    color: #2d2d2d;
    font-weight: 100;
  }
  & > a:first-child {
    background-color: ${(props) =>
      props.selected === "login" ? "#2D2D2D" : "#E6E6E6"};
    color: ${(props) => (props.selected === "login" ? "#FFFFFF" : "#000000")};
  }
  & > a:nth-child(2) {
    position: relative;
  }
`;
export const LogoutContent = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
  position: relative;
`;
export const LogoutWrapper = styled.div`
  cursor: pointer;
  border: 1px solid #d4d4d4;
  background-color: white;
  z-index: 3;
  position: relative;
  border-radius: 20px;
  padding: 5px;
  display: flex;
  font-size: 13px;
  align-items: center;
  & > div {
    width: 27px;
    height: 25px;

    color: white;
    background-color: #13aeba;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
  }
  span {
    color: black;
    font-weight: bold;
    margin-left: 7px;
  }
`;
export const LogoutContainer = styled.div`
  background-color: #fff;
  z-index: 9999;
  a {
    text-decoration: none;
  }
  display: ${(props) => (props.visiable ? "flex" : "none")};
  flex-direction: column;
  padding: 12px;
  position: absolute;
  border-radius: 6px;
  box-shadow: 6px 4px 11px 4px rgb(65 65 65 / 10%);
  margin-top: 10px;
  right: 0;
  text-align: left;
  span {
    color: black;
    cursor: pointer;
    margin-left: 10px;
    line-height: 20px;
  }
`;
export const AccountViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    display: flex;
    align-items: center;
  }
  button {
    margin: 10px 0;
    width: 100%;
    padding: 5px;
    border-radius: 28px;
    border: none;
    font-weight: 600;
    cursor: pointer;
  }
  span {
    white-space: nowrap;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    text-transform: capitalize;
  }
`;
export const MobileMenu = styled.div`
  padding: 0 35px;
  box-sizing: border-box;
  display: none;
  position: relative;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    & > div:first-child {
      background-color: #fff;
      border: 1px solid #d4d4d4;
      border-radius: 100%;
      font-family: bold;
      width: 40px;
      height: 40px;
      font-size: 20px;
      font-family: "Montserrat";
      color: #2d2d2d;
      margin-right: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      @media screen and (max-width: 768px) {
        margin-right: 15px;
      }
      @media screen and (max-width: 360px) {
        margin-right: 0px;
      }
    }
  }
`;
export const MobileNavMenu = styled.div`
  /* padding: 0 20px 0 20px; */
  box-sizing: border-box;
  display: none;
  position: relative;

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    & > div:first-child {
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      margin-right: 10px;
      justify-content: center;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius: 100%;
        padding: 2px;
        background: linear-gradient(
          to right,
          #feb1a7 0%,
          #ff8975 11%,
          #fe8458 22%,
          #feba61 33%,
          #fed479 44%,
          #d7eca7 55%,
          #77e6bf 67%,
          #13aeba 78%,
          #016b99 89%,
          #052e5d 100%
        );
        -webkit-mask: linear-gradient(#fff 0 0) content-box,
          linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out;
        mask-composite: exclude;
      }
    }
    & > div:nth-child(2) {
      display: flex;
      background-color: #f3f3f3;
      border-radius: 100%;
      width: 42px;
      height: 42px;
      align-items: center;
      justify-content: center;
      img {
        margin-top: 40px;
      }
    }
  }
`;
export const MobileListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  z-index: 1000;
  margin-top: 55px;
  a {
    cursor: pointer;
    padding: 10px 0;
    text-decoration: none;
    color: #1e2123;
    font-size: 16px;
    font-weight: 400;
  }
`;
export const MobileContainer = styled.div`
  position: fixed;
  width: 100%;
  background: rgba(0, 0, 0, 0.314);
  backdrop-filter: blur(2px);
  height: 100vh;
  z-index: 100;
  top: 0;
  opacity: ${(props) => (props.opac === "show" ? 1 : 0)};
  transition: all 0.5s ease-out;
  margin-left: -30px;
`;
export const MobileWrapper = styled.div`
  transform: ${(props) =>
    props.position === "show" ? "translate(0, 0)" : "translate(250px, 0)"};
  transition: all 0.5s ease-out;
  width: 250px;
  z-index: 10000;
  min-height: 100vh;
  background-color: white;
  position: fixed;
  right: 0;
  top: 0;
`;
export const SearchWrapper = styled.div`
  transform: ${(props) =>
    props.position === "show" ? "translate(0, 0)" : "translate(250px, 0)"};
  transition: all 0.5s ease-out;
  width: 250px;
  z-index: 10000;
  min-height: 500px;
  background-color: white;
  position: fixed;
  right: 0;
  top: 120px;
  border: 2px solid #d4d4d4;
  border-radius: 20px;
  padding: 14px 19px;
  box-sizing: border-box;
  & > div {
    display: flex;
    flex-direction: column;
    span {
      font-size: 13px;
      display: inline-block;
      font-weight: bold;
      text-align: left;
    }
    & > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }
  img {
    cursor: pointer;
  }
  color: black;
  & > div > div {
    div {
      display: flex;
      align-items: center;
    }

    p {
      font-size: 14px;
      padding: 0 !important;
      text-align: left;
      color: #d4d4d4;
    }

    & > div > p:first-child {
      margin-right: 10px;
      display: inline-block;
    }
  }
`;
export const NotificationIcon = styled.div`
  position: relative;
  cursor: pointer;
`;
export const NotificationBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
`;
export const NotificationContainer = styled.div`
  width: 100%;
  height: 50vh;
  overflow-y: auto;
`;
export const NotificationDropdown = styled.div`
  position: absolute;
  top: 8rem;
  right: 2rem;
  width: 30%;
  background: #fff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 16px;
  z-index: 10000;
  display: ${({ visible }) => (visible ? "block" : "none")};

  & > div {
    padding: 10px;

    font-size: 14px;
    color: #333;
    cursor: pointer;

    &:hover {
      background-color: #f5f5f5;
    }
  }

  & > div:last-child {
    border-bottom: none;
  }
`;
export const NotificationOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ visible }) => (visible ? "block" : "none")};
`;
export const NotificationHeader = styled.div`
  display: flex; /* Use flexbox to arrange items */
  justify-content: space-between; /* Space between text and icon */
  align-items: center; /* Center items vertically */
`;
export const NotificationHeaderText = styled.h2`
  font-size: 1.25em;
  font-weight: bold;
  color: black; /* Text color */
`;
export const Divider = styled.hr`
  margin: 8px 0;
  border: none;
  border-top: 1px solid #e0e0e0;
`;
export const SectionTitle = styled.h3`
  font-size: 1em;
  color: #757575;
  margin-top: 12px;
  margin-bottom: 8px;
`;
export const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-radius: 16px;
  padding: 10px;
  margin-bottom: 8px;
  border: 1px solid #e0e0e0;
`;
export const NotificationImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
  object-fir: cover;
`;
export const NotificationText = styled.div`
  font-size: 0.9em;
  color: #333;
`;
export const NotificationUsername = styled.span`
  font-weight: bold;
  color: #000;
  margin-right: 4px;
`;

export const NoNotificationsText = styled.div`
  text-align: center;
  color: #888;
  font-size: 0.9em;
  margin: 16px 0;
`;

export const SeeMore = styled.div`
  text-align: right;
  font-size: 0.85em;
  color: #333;
  cursor: pointer;
  margin-top: 16px;
`;
