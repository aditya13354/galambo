import styled from "styled-components";

export const ContactContainer = styled.div`
  position: relative;
  & > img {
    position: absolute;
    opacity: 0.4;
  }
  img:first-child {
    left: 0 !important;
    top: 100px;
  }
  img:nth-child(2) {
    right: 0 !important;
    top: 100px;
  }
  margin-top: 41px;
  .error {
    border: 1px solid #fe8458;
  }
`;
export const ContactWrapper = styled.div`
  & > div:first-child {
    position: relative;
    & > div:first-child {
      position: absolute;
      right: -90px;
      top: -20px;
    }
  }
  & > h1 {
    font-size: 47px;
    font-weight: lighter;
    font-family: "Montserrat";
    margin: 15px 0 42px 0;
  }
  position: relative;
  z-index: 1;
  max-width: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  margin: 0 auto 120px auto;
`;
export const ErrorTxt = styled.span`
  color: #fe8458;
  font-size: 14px;
  text-align: left;
`;
export const ContactForm = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 15px;
  & > div {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    & > div {
      width: 100% !important;
    }
  }
`;
export const RequireField = styled.div`
  margin-top: 14px;
  border-radius: 35px;
  background-color: #fe8458;
  width: 100%;
  padding: 9px 0;
  font-size: 13px;
  color: white;
`;
export const ContactInput = styled.input`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: 40px;
  outline: none;
  color: black;
  padding: 0 10px 0 28px;
  box-sizing: border-box;
  border: 1px solid #d4d4d4;
  border-radius: 70px;
`;
export const CommentView = styled.textarea`
  border: 1px solid #d4d4d4;
  outline: none;
  padding: 28px 10px 10px 28px;
  box-sizing: border-box;
  width: 100%;
  height: 200px;
  border-radius: 32px;
`;
export const SendBtn = styled.button`
  cursor: pointer;
  background-color: transparent;
  width: ${(props) => (props.width ? props.width : "100%")};
  height: 40px;
  outline: none;

  padding: 0 10px;
  box-sizing: border-box;
  border: 1px solid #d4d4d4;
  max-width: 168px;
  @media screen and (max-width: 475px) {
    max-width: 100% !important;
  }
  border-radius: 70px;

  &:disabled {
    cursor: not-allowed;
    color: #d4d4d4;
  }
`;
export const SocialView = styled.div`
  margin-top: 10px;
  margin-bottom: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  a {
    margin-right: 5px;
  }
`;
