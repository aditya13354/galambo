import { styled } from "styled-components";

export const CollapseWrapper = styled.div`
  contain: content;
  height: fit-content;
  /* max-width: 308px; */
  width: 100%;
`;

export const CollapseHeader = styled.div`
  padding: 0 33px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row !important;
  background-color: #2d2d2d;
  border-radius: 50px;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ open }) => (open ? "#2D2D2D" : "#F2F2F2")};
  h3 {
    text-align: left;
    color: ${({ open }) => (open ? "#fff" : "black")};

    font-size: 13px;
    margin-right: 20px;
    font-weight: lighter;
  }
  img {
    margin: 0 !important;
  }
  @media screen and (max-width: 768px) {
    h3 {
      font-size: 13px;
      font-weight: bold;
    }
  }
`;

export const CollapseContent = styled.div`
  padding: ${({ open }) => (open ? "20px" : "0 80px 0 32px")};
  height: ${({ open }) => (open ? "fit-content" : "0px")};
  opacity: ${({ open }) => (open ? 1 : 0)};
  color: #3b3f42;
  transition: all 0.3s ease-in-out;
  font-size: 13px;
  font-weight: 400;
  border: 1px solid #d4d4d4;
  border-radius: 32px;
  text-align: left;
  @media screen and (max-width: 768px) {
    font-size: 13px;
    font-weight: lighter;
    padding: ${({ open }) => (open ? "25px 28px" : "0 14px 0")};
  }
`;
