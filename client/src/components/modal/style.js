import styled from "styled-components";

export const ImageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  a {
    margin-right: 0;
    text-decoration: none;
    div {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
  }
  span {
    font-size: 13px;
    padding: 8px 0 8px 22px;
    font-weight: bold;
  }
  background-color: #f6f6f6;
`;
export const IconView = styled.div`
  display: flex;
  margin-right: 15px;
  width: 48px;
  justify-content: space-between;
  align-items: center;
`;
export const ImageContent = styled.div`
  display: flex;
  justify-content: center;
  img {
    max-width: 100% !important;
    max-height: 300px !important;
  }
`;
