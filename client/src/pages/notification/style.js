import styled from "styled-components";

export const NotificationContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const NotificationTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid #ddd;

  &:hover {
    background-color: #f9f9f9;
  }

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
`;

export const NotificationContent = styled.div`
  font-size: 16px;
  color: #555;

  @media (max-width: 768px) {

    font-size: 14px;
  }
`;

export const Username = styled.span`
  font-weight: bold;
  color: #333;
`;
