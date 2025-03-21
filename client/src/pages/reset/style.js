import styled from "styled-components";

export const ResetContainer = styled.div`
  margin-top: 135px;
  @media screen and (max-width: 768px) {
    margin-top: 88px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  h1 {
    font-size: 47px;
    font-weight: lighter;
    font-family: "Montserrat";
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
      padding: 15px;
      outline: none;
    }
    button {
      @media screen and (max-width: 400px) {
        width: 90%;
      }
      margin-top: 15px;
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
  }
`;
export const RequireField = styled.div`
  margin-top: 14px;
  border-radius: 35px;
  background-color: #fe8458;
  width: 100%;
  padding: 13px 0;
  font-size: 13px;
  color: white;
  width: fit-content;
  padding: 10px 20px;
`;
