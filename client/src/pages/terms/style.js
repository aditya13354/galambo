import styled from "styled-components";
import backImg from "../../assets/term/background.png";

export const TermContainer = styled.div`
  background-image: url(${backImg});
  background-repeat: no-repeat;
  background-position: bottom;
  /* background-size: 100% 100%; */
`;
export const TermWrapper = styled.div`
  max-width: 655px;
  margin: 50px auto 200px auto;
  width: 90%;
  * {
    font-size: 13px;
    text-align: left;
  }
  & > p {
    text-align: left;
  }
  & > span {
    font-size: 37px;
    
    font-weight: 200 !important;
    margin: 0;
    margin-bottom: 20px !important;
    display: inline-block;
    text-transform: uppercase;
  }
  @media screen and (max-width: 768px) {
    margin: 45px auto 100px auto;
    font-size: 40px;
    margin-bottom: 54px !important;
    h1 {
      text-align: center;
    }
  }
`;
export const TermProvider = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  width: 100%;
  h3 {
    margin-top: 35px;
    font-family: "Poppins";
    background-color: #f3f3f3;
    padding: 10px 22px;
    box-sizing: border-box;
    width: 100%;
    border-radius: 35px;
    text-align: left;
    font-size: 13px;
    font-weight: 900 !important;
    color: #2d2d2d;
  }
  span {
    text-align: left;
    font-size: 13px;
    color: #2d2d2d;
    font-weight: 500;
    margin-left:2rem;
    max-width: 100%%;
  }
`;
