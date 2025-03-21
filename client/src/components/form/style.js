import styled from "styled-components";

export const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  text-align: center;
  font-family: "Montserrat";
  label {
    margin-bottom: 10px;
    align-items: center;
    display: flex;
  }
  div {
    border: 1px solid #d4d4d4;
    display: flex;
    align-items: center;
    border-radius: 50px;
    img {
      cursor: pointer;
      margin-right: 28px;
      width: 24px;
      height: 15px;
    }
  }
  input {
    /* border: 1px solid #d4d4d4; */
    border-radius: 50px;
    width: 100%;
    border: none;
    @media screen and (max-width: 425px) {
      font-size: 10px;
    }
  }
`;
