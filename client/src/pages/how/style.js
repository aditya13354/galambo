import styled from "styled-components";

export const HowWrapper = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
`;

export const HowContainer = styled.div`
  margin: 55px auto 200px auto;
  h1 {
    font-size: 47px;
    font-weight: lighter;
    text-transform: uppercase;
    margin: 0;
  }
  @media screen and (max-width: 425px) {
    margin: 45px auto;
    h1 {
      padding: 0 60px;
    }
  }
`;

export const HowItmes = styled.div`
  margin-top: 100px;
  @media screen and (max-width: 425px) {
    margin: 50px auto;
  }
`;

export const HowItemWrapper = styled.div`
  max-width: 970px;
  margin: 0 auto;
  padding: 40px 0;
  height: 100%;
  display: flex;
  flex-direction: ${(props) => (props.index % 2 === 0 ? "row" : "row-reverse")};
  align-items: center;
  justify-content: space-between;
  &:nth-child(even) {
    align-items: flex-start;
  }
  &:first-child {
    max-width: 876px;
    img {
      width: 352px;
    }
  }
  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: center !important;
    gap: 40px;
    padding: 20px 5px;
  }
  @media screen and (max-width: 425px) {
    img {
      object-fit: contain;
      width: 100%;
      height: auto;
    }
  }
`;

export const HowItemContainer = styled.div`
  max-width: 334px;
  padding: 28px;
  border-radius: 32px;
  border: 1px solid #d4d4d4;
  text-align: left;
  font-size: 13px;
  p {
    line-height: 25px;
  }
`;

export const HowItemContent = styled.div`
  div {
    padding: 10px 0;
  }
  a {
    width: 98px;
    height: 35px;
    border-radius: 76px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    font-family: Poppins;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    color: #2d2d2d;
  }
`;
