import styled, { createGlobalStyle } from "styled-components";
import clepto from "../../assets/Clepto.ttf";

export const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'Clepto';
    src: url(${clepto}) format('truetype');
    font-weight: 300;
    font-style: normal;
    font-display: auto;
  }
 `;
export const StyledAboutWrapper = styled.div`
  margin-bottom: 40px;
  padding: 0 20px;
`;

export const StyledAbout = styled.div`
  margin: 30px auto 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > div {
    position: relative;
    & > img:nth-child(2) {
      position: absolute !important;
      top: -18px;
      right: -33px;
    }
  }
  @media screen and (max-width: 768px) {
    margin: 30px auto 20px auto;
    flex-direction: column;
    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;
export const AboutTxt = styled.div`
  background-color: #f1f1f1;
  padding: 20px 30px;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: auto;
  max-width: 840px;
  box-sizing: border-box;

  border-radius: 30px;
  margin-bottom: 40px;
  position: relative;
  & > div:first-child {
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    span {
      text-align: left;
      font-size: 13px;
      @media screen and (max-width: 426px) {
        font-size: 14px;
      }
      span {
        color: black;
        font-family: "Clepto", sans-serif;
        font-size: 13px;
        font-weight: bold;
        @media screen and (max-width: 426px) {
          font-size: 16px;
        }
      }
    }
  }
  & > div:nth-child(2) {
    width: 28px;
    height: 28px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    position: absolute;
    top: -20px;
  }
`;
export const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    margin: 0;
    font-size: 13px;
  }
`;

export const KeyFeatures = styled.div`
  .item1 {
    grid-area: item1;
  }
  .item2 {
    grid-area: item2;
  }
  .item3 {
    grid-area: item3;
  }
  .item4 {
    grid-area: item4;
  }
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  grid-template-areas:
    "item1 item3"
    "item2 item4";

  grid-gap: 30px 50px;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  margin-top: 34px;
  @media screen and (max-width: 768px) {
    margin-top: 24px;
    margin-bottom: 70px;
    max-width: 500px;
    grid-gap: 20px 20px;
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 4fr);
    grid-template-areas:
      "item1"
      "item2"
      "item3"
      "item4";
  }
`;
export const StyledDescription = styled.div`
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  @media screen and (max-width: 600px) {
    justify-content: center;
  }

  p {
    font-size: 13px;
    margin: 0 !important;
    color: #2d2d2d;
    font-family: "Poppins" !important;
  }

  & > div:first-child {
    background-color: #fff;
    border: 1px solid #d4d4d4;
    border-radius: 100%;
    font-family: bold;
    width: 52px;
    height: 52px;
    font-size: 20px;
    font-family: "Montserrat";
    color: #2d2d2d;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    @media screen and (max-width: 768px) {
      margin-right: 7px;
      width: 32px;
      height: 32px;
    }
  }
`;

export const WhyContent = styled.div`
  margin: 40px 0 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h4 {
    margin-top: 0;
  }

  p {
    margin: 0;
    max-width: 840px;
    background-color: #f1f1f1;
    border-radius: 30px;
    font-size: 13px;
    padding: 20px 30px;
    text-align: left;
  }

  span {
    color: black;
    font-family: "Clepto", sans-serif;
    font-weight: bold;
    @media screen and (max-width: 426px) {
      font-size: 16px;
    }
  }
`;
