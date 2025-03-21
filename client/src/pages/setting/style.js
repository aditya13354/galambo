import styled from "styled-components";

export const SettingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  width: 100%;
  // height: calc(100vh - 200px);
  flex: 1;
  margin: 0 auto;
`;

export const SettingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: 50px 70px;
  gap: 100px;
  @media screen and (max-width: 1024px) {
    margin: 20px 28px;
    gap: 50px;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SettingSliebar = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  h1 {
    font-size: 30px;
    font-weight: 300;
    margin: 0;
    line-height: 37px;
    padding-left: 10px;
  }
  div {
    margin-top: 27px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    span {
      font-size: 18px;
      display: flex;
      align-items: center;
      padding: 10px;
      gap: 10px;
      cursor: pointer;
    }
  }
  @media screen and (max-width: 1024px) {
    h1 {
      font-size: 25px;
    }
    div {
      span {
        font-size: 14px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const SettingContent = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 840px;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 45px;
  nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 160px;
      height: 160px;
      border: 2px solid #f2f2f2;
      border-radius: 100%;
    }
    form {
      margin-top: -20px;
      button {
        /* margin: 0; */
        background: #f2f2f2;
        border: none;
        border-radius: 37px;
        font-size: 11px;
        font-weight: 500;
        line-height: 14px;
        color: black;
        width: max-content;
        padding: 8px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 14px;
    text-align: left;
    h1 {
      font-size: 24px;
      font-weight: 500;
      line-height: 29px;
      margin: 0;
      padding: 11px 16px;
    }
    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 11px 16px;
      font-size: 16px;
      line-height: 19.5px;
      font-weight: 500;
      background-color: #f6f6f6;
      border-radius: 39px;
    }
    textarea {
      height: 85px;
      border: 1px solid #d4d4d4;
      border-radius: 22px;
      padding: 10px 18px;
      font-size: 13px;
      line-height: 16px;
    }
    p {
      margin: 0;
      padding: 10px;
      font-size: 13px;
      font-weight: 400;
      line-height: 16px;
    }
  }
  @media screen and (max-width: 640px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const EditBtns = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 12px;
  button {
    padding: 10px 38px;
    background-color: #001836;
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    color: white;
    border: none;
    border-radius: 37px;
    width: max-content;
  }
  div {
    display: flex;
    flex-direction: row;
    /* align-items: end; */
    justify-content: end;
  }
`;

export const SettingTabContainer = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    width: 100%;
    flex-direction: row;
    border-top: 1px solid #d1d1d1;
    gap: 30px;
    overflow-x: auto;
  }
`;

export const SettingTabItem = styled.div`
  display: flex;
  padding: 10px;
  text-wrap: nowrap;
  color: #8080808c;
`;

export const NotificationContainer = styled.div`
  font-family: Arial, sans-serif;

  max-height: 400px; /* adjust height as needed */
  overflow-y: auto;
`;

export const NotificationTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #000;
  margin-bottom: 20px;
`;

export const NotificationSection = styled.div`
  margin-bottom: 20px;
`;

export const NotificatinSectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

export const Notification = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #000000;
  margin-bottom: 10px;
`;

export const NotifcationAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const NotificationMessage = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0;

  strong {
    color: #000;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const AcceptButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

export const RejectButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #e53935;
  }
`;
