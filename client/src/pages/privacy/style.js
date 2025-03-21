import styled from "styled-components";
import backImg from "../../assets/term/background.png";

export const TermContainer = styled.div`
  background-image: url(${backImg});
  background-repeat: no-repeat;
  background-position: bottom;
  /* background-size: 100% 100%; */
`;
export const TermWrapper = styled.div`
  max-width: 575px;
  margin: 80px auto 200px auto;
  width: 90%;
 
  & > span {
    font-size: 47px;
    font-family: Montserrat;
    font-weight: lighter !important;
    margin-bottom: 30px !important;
    display: inline-block;
  }
  @media screen and (max-width: 768px) {
    margin: 80px auto 100px auto;
  }
`;
export const TermProvider = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  
  div {
    font-size: 13px;
    font-weight: lighter;
    text-align: left;
    margin-top:1rem;
  }
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
    font-weight: 900;
    color: #2d2d2d;
  }
  span {
    text-align: left;
    font-size: 13px;
    color: #2d2d2d;
    font-weight: 500;
    max-width: 100%;
  }
    ul {
     list-style-type: none; /* Remove default bullet */
  padding: 0;
  li::before {
    content: "-"; /* Add a hyphen before each list item */
    margin-right: 8px; /* Add spacing between the hyphen and text */
  }
    }
`;
