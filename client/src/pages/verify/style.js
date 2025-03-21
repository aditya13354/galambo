import styled from "styled-components";

export const VerifyContainter = styled.div`
  margin: 0 auto 100px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    max-width: 348px !important;
    border-radius: 40px;
    padding: 10px 28px;
    box-sizing: border-box;
    outline: none;
    width: 95%;
  }
  button {
    @media screen and (max-width: 400px) {
      width: 90%;
    }
    padding: 10px 38px;
    font-size: 13px;
    position: relative;
    background-color: transparent;
    border: none;

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
  h1 {
    font-size: 47px;
    font-weight: lighter;
  }
  span {
    max-width: 230px;
    font-size: 13px;
    font-weight: lighter;
  }
  img {
    margin-top: 36px;
  }
  a {
    text-decoration: none;
    color: black;
    h6 {
      margin: 11px 0 0 0;
      font-size: 13px;
    }
  }
`;
