import styled from "styled-components";
import backImg from "../../assets/term/background.png";

export const TermContainer = styled.div`
  background-image: url(${backImg});
  background-repeat: no-repeat;
  background-position: bottom;
  /* background-size: 100% 100%; */
  span {
    font-size: 40px;
    font-family: Montserrat;
    font-weight: lighter !important;
    margin-bottom: 74px !important;
    display: inline-block;
  }
`;
export const TermWrapper = styled.div`
  margin: 80px auto 200px auto;
  width: 90%;
  a {
    text-decoration: none;
  }
  @media screen and (max-width: 768px) {
    margin: 80px auto 290px auto;
    div:nth-child(2) {
      flex-direction: column-reverse;
    }
    div:nth-child(4) {
      flex-direction: column-reverse;
    }
    div:nth-child(3) {
      margin-top: 40px !important;
    }
    div:nth-child(4) {
      margin-top: 40px !important;
    }
    div:nth-child(5) {
      margin-top: 40px !important;
    }
  }
  & > span {
    margin-top: 114px;
  }
`;
export const BlogDetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  max-width: 980px;
  margin: 0 auto 0 auto;
  img {
    border-radius: 32px;
    width: 373px;
  }
  span {
    max-width: 410px;
  }
  img {
    max-width: 100%;
  }
  /* & > div:first-child {
    img {
      margin-top: 40px !important;
    }
  }
  & > div:first-child {
    img {
      margin-top: 40px !important;
    }
  } */
  & > div {
    max-width: 50%;
    @media screen and (max-width: 768px) {
      max-width: 100% !important;
    }
    text-align: left;
  }
  p {
    font-size: 13px;
    font-weight: lighter;
    padding: 10px 0;
    margin: 0;
  }
  @media screen and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      font-size: 30px !important;
      max-width: 100%;
    }
  }
  @media screen and (max-width: 375px) {
    span {
      max-width: 265px;
    }
  }
`;
export const PreviousBtn = styled.div`
  padding: 18px 21px;
  font-size: 13px;
  font-weight: lighter;
  border-radius: 32px;
  background-color: #f2f2f2;
  color: #2d2d2d;
  width: fit-content;
  margin: 58px auto auto auto;
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    margin-right: 14px;
    width: fit-content;
  }
`;
export const ImageView = styled.div`
  background-image: url(${(props) => props.link && props.link});
  background-size: auto 100%;
  width: 373px;
  border-radius: 32px;

  background-position: center;
  background-repeat: no-repeat;
  @media screen and (max-width: 1024px) {
    min-height: 441px !important;
    margin-top: 40px;
  }
`;
export const BlogContent = styled.div`
  display: flex;
  flex-direction: column;
  div:first-child {
    margin-top: 0px;
  }
`;
export const BlogPomp = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 392px;
  @media screen and (max-width: 1024px) {
    width: 350px;
  }
`;
export const BlogCardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${(props) => (props.index % 2 === 1 ? "row" : "row-reverse")};
  span {
    margin-bottom: 0 !important;
  }
  margin-top: 30px;
  @media screen and (max-width: 1024px) {
    flex-direction: column-reverse;
    margin-top: 280px;
    img {
      max-width: 350px !important;
    }
  }
`;

export const BlogCard = styled.div`
  position: absolute;
  z-index: 10;
  ${(props) => (props.index % 2 === 1 ? "right: -30px;" : "left: -30px;")};
  background-color: white;
  border-radius: 32px;
  border: 1px solid #d4d4d4;
  padding: 27px;
  box-sizing: border-box;
  @media screen and (max-width: 1024px) {
    right: 0;
    left: 0;
    top: -30px;
  }
  text-align: left;
  h1 {
    font-size: 13px;
    font-weight: bold;
  }
  h2 {
    margin-top: 50px;
    @media screen and (max-width: 1024px) {
      margin-top: 31px;
    }
    font-size: 13px;
    font-weight: 500;
  }
  button {
    @media screen and (max-width: 1024px) {
      margin-top: 31px;
    }
    margin-top: 50px;
    background-color: #f3f3f3;
    border-radius: 32px;
    width: 168px;
    padding: 10px 0;
    border: none;
    cursor: pointer;
  }
`;
