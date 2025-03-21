import styled from "styled-components";

export const StyledForgotContainer = styled.div`
  margin-top: 135px;
  margin-bottom: 400px;
  @media screen and (max-width: 768px) {
    margin-top: 88px;
    margin-top: 88px;
  }
  width: 100%;
  span {
    font-size: 47px;
    font-weight: lighter !important;
    font-family: "Montserrat";
    margin: 0;
    @media screen and (max-width: 768px) {
      font-size: 40px;
    }
  }
    p {
    font-size: 15px;
    font-weight: lighter !important;
    font-family: "Montserrat";
    margin: 0;
    max-width:50%;
    margin-top:1rem;
    @media screen and (max-width: 768px) {
      font-size: 15px;
    }
  }
  & > div {
    margin-top: 30px;
    max-width: 348px;
    border-radius: 40px;
    /* padding: 10px 28px; */
    box-sizing: border-box;
    outline: none;
    width: 100%;
    @media screen and (max-width: 768px) {
      max-width: 425px;
      width: 95%;
    }
  }
  input {
    max-width: 348px !important;
    border-radius: 40px;
    padding: 10px 28px;
    box-sizing: border-box;
    outline: none;
    width: 100%;
  }
  & > div {
    label {
      display: none !important;
    }
  }
  button {
    @media screen and (max-width: 425px) {
      width: 95%;
    }
    margin-top: 10px;
    padding: 10px 38px;
    font-size: 13px;
    position: relative;
    background-color: transparent;
    border: none;
    color: black;

    &::before {
      cursor: pointer;
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: 20px;
      padding: 2px;
      background: linear-gradient(
        to right,
        #feb1a7 0%,
        #ff8975 11%,
        #fe8458 22%,
        #feba61 33%,
        #fed479 44%,
        #d7eca7 55%,
        #77e6bf 67%,
        #13aeba 78%,
        #016b99 89%,
        #052e5d 100%
      );
      -webkit-mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
    }
  }
  a {
  text-decoration:none;
  color:#000;
    margin-top: 8px;
    font-size: 13px;
    font-weight: 900;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const RequireField = styled.div`
  border-radius: 35px;
  background-color: #fe8458;
  width: 100%;
  font-size: 13px;
  color: white;
  width: fit-content;
  padding: 10px 20px;
  margin: 0 !important;
`;
