import styled from "styled-components";
export const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 72px;
  & > img {
    margin-top: 43px;
  }
  h1 {
    font-size: 20px;
    margin-top: 0;
    margin-bottom: 15px;
  }
  h2 {
    margin-top: 10px;
    font-size: 13px;
    font-weight: 300;
    margin-top: 15.56px;
  }
  h3 {
    margin-top: 10px;
    font-size: 13px;
    font-weight: 300;
    margin: 0 0 26px 0;
  }
  & > span {
    font-family: "Plus Jakarta Sans";
    font-size: 13px;
    font-weight: 400;

    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      margin-top: 27.95px;
    }
  }
`;
export const SearchInbox = styled.div`
  display: flex;
  margin: 28px 0;
  padding: 0 11px;
  box-sizing: border-box;
  width: 98%;
  align-items: center;
  justify-content: center;
`;
export const SearchSection = styled.div`
  display: block;
  align-items: center;
  justify-content: space-between;
  max-width: 560px;
  width: 100%;

  outline: 2px solid transparent;
  outline-offset: 2px;
  font-size: 1.125rem;
  line-height: 1.75rem;
  padding: 0.8rem 1.2rem 0.6rem 1.2rem;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 40px;
  border: 1px solid #d4d4d4;
  input {
    background-color: #ffffff;
  }
  & > div:first-child {
    width: 100%;
    @media screen and (max-width: 425px) {
      span {
        display: none;
      }
      & > div {
        display: none;
      }
    }
  }
  & > div {
    display: flex;
    align-items: flex-end;
  }
  input {
    height: 55px;
    width: 100%;
    border: none;
    outline: none;
  }
`;
export const IconSection = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
export const HistoryView = styled.div`
  background-color: #e6e6e6;
  height: 40px;
  padding: 0 10px;
  border-radius: 51px;
  width: fit-content;
  cursor: pointer;
  display: flex;
  align-items: center;
`;
export const ImageLoader = styled.div`
  background-color: #e6e6e6;
  margin-left: 0;
  margin-right: auto;
  height: 40px;
  padding: 0 10px;
  border-radius: 51px;
  width: fit-content;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
export const SearchStick = styled.div`
  height: 40px;
  width: 1px;
  background-color: black;
  margin: 0 20px;
`;

export const SearchIcon = styled.div`
  width: 56px;
  height: 56px;
  background-color: #ffffff;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 100%;
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
`;

export const SelectSection = styled.div`
  display: flex;
  flex-direction: column;

  div {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    & > button:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;
export const TagSelection = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 550px;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`;
export const TagBtn = styled.div`
  padding: 9.56px 17.52px 9.56px 17.52px;
  border-radius: 60.54px;
  width: fit-content;
  margin: 0 8px 15px 8px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "black" : "#f1f1f3")};
  color: ${(props) => props.selected && "white"};
  display: flex;
  align-items: center;
  font-size: 13px;
  & > img {
    max-width: 22px;
  }
  @media screen and (max-width: 600px) {
    margin: 0 10px 20px 0;
    padding: 9px 15px;
    font-size: 10px;
  }
`;
export const SearchWrapper = styled.div`
  transform: ${(props) =>
    props.position === "show" ? "translate(0, 0)" : "translate(250px, 0)"};
  transition: all 0.5s ease-out;
  width: 250px;
  z-index: 10000;
  min-height: 500px;
  background-color: white;
  position: fixed;
  right: 0;
  top: 120px;
  border: 2px solid #d4d4d4;
  border-radius: 20px;
  padding: 14px 19px;
  box-sizing: border-box;
  & > div {
    display: flex;
    flex-direction: column;
    span {
      font-size: 13px;
      display: inline-block;
      font-weight: bold;
      text-align: left;
    }
    & > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }
  img {
    cursor: pointer;
  }
  color: black;
  & > div > div {
    div {
      display: flex;
      align-items: center;
    }

    p {
      font-size: 14px;
      padding: 0 !important;
      text-align: left;
      color: #d4d4d4;
    }

    & > div > p:first-child {
      margin-right: 10px;
      display: inline-block;
    }
  }
`;
