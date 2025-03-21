import styled from "styled-components";
import back from "../../assets/home_back.png";
export const LoginContainer = styled.div`
  background-image: url(${back});
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
`;
export const LoginWrapper = styled.div`
  width: 100%;
  max-width: 420px;
  /* padding: 40px; */
  padding-top: 8px;
  padding-bottom: 40px;
  box-sizing: border-box;
  margin: auto;
  @media screen and (max-width: 425px) {
    max-width: 425px;
    padding: 8px 14px 40px 14px;
  }
`;
export const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    text-decoration: none !important;
  }
  form {
    width: 100%;
  }
  h1 {
    color: #262626;
    font-size: 45px;
    text-transform: uppercase;
    margin: 0 !important;
    font-family: "Montserrat";
    font-weight: lighter;
    @media screen and (max-width: 425px) {
      font-size: 40px;
    }
  }
  h2 {
    font-size: 16px;
  }
  h3 {
    font-size: 12px;
    font-weight: 200;
    text-align: right;
    width: 100%;
  }
`;
export const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    span {
      padding: 10px 0;
    }
  }

  input {
    color: #656567;
    padding: 20px 20px 20px 28px;
    box-sizing: border-box;
    outline: none;
    width: 100%;
    @media screen and (max-width: 425px) {
      padding: 14px 28px 14px 28px;
    }
  }
  width: 100%;
  font-size: 14px;
  @media screen and (max-width: 425px) {
    font-size: 10px;
  }
`;
export const ErrorTxt = styled.span`
  color: rgb(235, 54, 54);
  font-size: 14px;
  @media screen and (max-width: 425px) {
    font-size: 10px;
  }
`;
export const TermsContent = styled.div`
  width: 100%;
  display: flex;
  margin: 20px 0;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  input {
    margin-right: 10px;
    height: 20px;
    width: 20px;
    background-color: #f1f1f3;
  }
  a {
    color: #27babc;
  }
  .error_txt {
    color: #fe8458 !important;
  }
  .error_txt a {
    color: #fe8458 !important;
  }
  @media screen and (max-width: 425px) {
    font-size: 10px;
  }
`;
export const SubContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 24px 0;
  hr {
    width: 100%;
    background-color: #e4e4e7;
    height: 1px;
    border: none;
    margin: 0 10px;
    span {
      margin: 0 20px;
    }
  }
  @media screen and (max-width: 425px) {
    font-size: 10px;
  }
`;
export const GoogleAuthButton = styled.div`
  background-color: #f6f6f6;
  width: 100%;
  border-radius: 40px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    padding: 16px 0;
  }
  span {
    font-size: 13px;
    margin-left: 14px;
  }
  @media screen and (max-width: 425px) {
    div {
      padding: 11px 0;
    }
    span {
      font-size: 10px;
    }
  }
`;
export const Button = styled.button`
  margin: 10px 0;
  width: 100%;
  border-radius: 50px;
  height: 56px;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  color: ${(props) => (props.fcolor ? props.fcolor : "white")};
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin-right: 14px;
  }
  @media screen and (max-width: 425px) {
    height: 42px;
    font-size: 10px;
  }
`;
export const FormFooter = styled.div`
  margin: 24px 0;
  display: flex;
  flex-direction: column;
`;
export const RememberContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  label {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 5px;
  }
  input[type="checkbox"] + label:before {
    height: 20px;
    width: 20px;
    margin-right: 2px;
    content: " ";
    display: inline-block;
    vertical-align: baseline;
    background-color: #e6e6e6;
    border-color: #e6e6e6;
  }
`;
export const ForgotPassword = styled.div`
  color: #d4d4d4;
  font-size: 13px;
  margin-top: 12px;
  @media screen and (max-width: 425px) {
    font-size: 10px;
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
  @media screen and (max-width: 425px) {
    font-size: 10px;
  }
`;
export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
`;

export const StyledCheckbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 2px solid ${(props) => (props.checked ? "#E6E6E6" : "#FF6347")};
  border-radius: 50%;
  cursor: pointer;
  margin-right: 8px;
  background-color: ${(props) => (props.checked ? "#E6E6E6" : "transparent")};
  position: relative;
`;

export const CheckboxBase = styled.div`
  width: 14px;
  height: 2px;
  background-color: ${(props) => (props.checked ? "transparent" : "#FF6347")};
  position: absolute;
  bottom: -8px;
  left: 3px;
`;

export const Checkmark = styled.div`
  display: ${(props) => (props.checked ? "block" : "none")};
  /* color: black; */
`;
