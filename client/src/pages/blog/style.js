import styled from "styled-components";
import backImg from "../../assets/term/background.png";

export const TermContainer = styled.div`
  background-image: url(${backImg});
  background-repeat: no-repeat;
  background-position: bottom;
  /* background-size: 100% 100%; */
`;
export const TermWrapper = styled.div`
  margin: 80px auto 200px auto;
  width: 90%;
  & > span {
    font-size: 47px;
    font-family: Montserrat;
    font-weight: lighter !important;
    margin-bottom: 74px !important;
    display: inline-block;
  }
  @media screen and (max-width: 768px) {
    margin: 80px auto 290px auto;
  }
`;
export const BlogContent = styled.div`
  margin-top: 102px;
  @media screen and (max-width: 768px) {
    margin-top: 82px;
  }
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
  flex-direction: ${(props) => (props.index % 2 === 0 ? "row" : "row-reverse")};

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
  ${(props) => (props.index % 2 === 0 ? "right: -30px;" : "left: -30px;")};
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
