import styled, { createGlobalStyle } from "styled-components";
import clepto from "../../assets/Clepto.ttf";

export const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'Clepto';
    src: url(${clepto}) format('truetype');
    font-weight: 300;
    font-style: normal;
    font-display: auto;
  }
 `;
export const GlobeContainer = styled.div`
  font-family: "Clepto" !important;
  width: 100%;
  font-size: 1rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

export const MainContainer = styled.div`
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  position: relative;
  & > span {
    color: black;
  }
  & > div:nth-child(2) {
    padding: 0 2rem 0 2rem;
    width: ${(props) => (props.visible ? "100%" : "calc(100% - 294px)")};
    @media screen and (max-width: 1024px) {
      width: 100%;
      padding: 0 2rem;
      box-sizing: border-box;
    }
    @media screen and (max-width: 1024px) {
      padding: 0 1rem;
    }
  }
`;
export const LoadContainer = styled.div`
  display: flex;
  margin: 100px 0 0 0;
  width: 100vw;
  align-items: center;
  justify-content: center;
  img {
    width: 90%;
    max-width: 150px;
  }
`;
export const DataHeader = styled.div`
  /* margin-top: 1.5rem; */
  color: black;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* padding: 1.5rem 0; */
  justify-content: space-between;
  /* & > div:nth-child(3n) {
    width: 24rem;
  } */
`;
export const DataDescription = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    position: absolute;
    top: 10px;
    background-color: white;
    width: 28px;
    height: 28px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  span {
    margin-top: 20px;
    border-radius: 50px;
    padding: 25px;
    text-align: left;
    font-size: 13px;
    background-color: #f2f2f2;
  }
`;
export const SearchKeyWordDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const SearchKeyWord = styled.div`
  display: flex;
  align-items: center;
  margin-top: 28px;
  /* justify-content: center; */
  padding: 20px 22px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: auto;
    left: 0;
    border-radius: 76px;
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
  span {
    padding: 0 5px;
  }
`;
export const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  width: 100%;
`;
export const KeywordTag = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  /* & > div {
    margin-left: 8px;
  } */
`;
export const SearchMaybeTag = styled.div`
  @media screen and (max-width: 1024px) {
    display: none;
  }
  background-color: #f3f3f3;
  padding: 10px 20px 10px 67px;
  position: relative;
  border-radius: 50px;
  font-size: 13px;
  display: flex;
  label {
    color: #ff8764;
    text-decoration: underline;
  }
  img {
    position: absolute;
    top: -5px;
    left: 15px;
  }
`;
export const SearchRgihtContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const BackBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f3f3;
  padding: 8px 20px;
  gap: 10px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 13px;
  @media screen and (max-width: 600px) {
    font-size: 10px;
  }
`;
export const SearchHistory = styled.div`
  display: flex;
  margin-left: 8px;
  background-color: #2d2d2d;
  padding: 8px 13px 8px 23px;
  border-radius: 40px;
  font-weight: 600;
  color: #fff;
  font-size: 13px;
  font-weight: lighter;
  width: fit-content;
  a {
    color: #000;
    margin-right: 0;
    margin-left: 1rem;
    font-size: 18px;
    align-items: center;
    display: flex;
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
  div:nth-child(3) {
    button {
      font-size: 0.8rem;
    }
  }
`;
export const CategoryBtn = styled.button`
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "black" : "#E9E9E9")};
  color: ${(props) => props.selected && "white"};
  border: none;
  border-radius: 88px;
  margin-bottom: 10px;
`;
export const SubCategoryBtn = styled.button`
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "black" : "#E9E9E9")};
  color: ${(props) => props.selected && "white"};
  border-radius: 88px;
  padding: 10px;
  font-family: Plus Jakarta Sans;
  font-size: 14px;
  font-weight: 500;
  border: none;
  margin-bottom: 10px;
`;
export const DataWrapper = styled.div`
  margin-top: 2rem;
  color: black;
  display: flex;
  justify-content: space-between;
`;
export const ArrowWrapper = styled.div`
  display: flex;
  @media screen and (max-width: 1024px) {
    & {
      display: none;
    }
  }
  margin: 40px 0 0 2rem;
  background-color: white;
  box-shadow: 2px 4px 55.599998474121094px 0px #00000040;
  width: fit-content;
  height: 100%;
  flex-direction: column;
`;
export const TreeWrapper = styled.div`
  display: flex;
  @media screen and (max-width: 1024px) {
    & {
      display: none;
    }
  }
  margin: 40px 0 0 2rem;
  border-radius: 24px;
  background-color: white;
  box-shadow: 2px 4px 55.599998474121094px 0px #00000040;
  max-width: 294px;
  width: 100%;
  height: fit-content;
  flex-direction: column;

  ul,
  li {
    cursor: pointer;
    padding: 5px;
  }
  li {
    text-align: left;
  }
  ul {
    padding-right: 15px;
    padding-left: 15px;
  }
  & > div:first-child {
    font-family: Plus Jakarta Sans;
    font-size: 16px;
    font-weight: 800;
    border-bottom: 1px solid #d9d9d9;
    padding: 50px 20px 30px 20px;
    word-wrap: break-word;
    color: black;
  }
`;
export const ResultWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  & > div {
    display: flex;
    flex-direction: column;
    width: fit-content;
    margin: 0 !important;
    img {
      height: 11rem;
      width: fit-content;
      margin-top: 12px;
      cursor: pointer;
    }
  }
  text-align: left;
  .sub {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    @media screen and (max-width: 600px) {
      padding: 10px 3px;
    }
  }
  .parent {
    max-width: 100%;
    width: fit-content;
    border-radius: 32px;
    height: fit-content;
    display: flex;
    flex-wrap: wrap;
    @media screen and (max-width: 600px) {
      border-radius: 0;
      justify-content: center;
    }
    .last_col {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .tree {
    font-weight: bold;
    display: flex;
    align-items: center;
    font-size: 13px;
    margin-top: 15px;
    svg {
      margin-left: 5px;
    }
  }
  .last_sub {
    padding: 0 20px 0 0;
    border-radius: 24px;
    width: fit-content;
    & > span {
      padding: 9px 23px;
      box-sizing: border-box;
      border-radius: 32px;
      background-color: #f6f6f6;
    }
    @media screen and (max-width: 600px) {
      border-radius: 0 !important;
      max-width: 100% !important;
      margin: 0 !important;
      padding: 0;
    }
  }
  .subxxx {
    display: flex;
  }
  .last_tree {
    display: flex;
    flex-wrap: wrap;
    border: none;
    box-shadow: none;
    div {
      border-radius: 24px;
      @media screen and (max-width: 600px) {
        margin: 0;
      }
    }
    & > div {
      & > div {
        padding: 10px;
      }
    }
  }
  .last_node {
  }
`;
export const DeatiledCard = styled.div`
  img {
    max-height: 150px !important;
    max-width: 425px !important;
    height: auto;
  }
  margin: 0 15px;
  a {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    flex-direction: column;
    text-decoration: none;

    span {
      max-width: 200px;
      padding-top: 10px;
      color: black;
    }
  }
  svg {
    position: absolute;
  }
`;
export const MenuForm = styled.div``;
export const MenuView = styled.div`
  & > div:first-child {
    img {
      margin-right: 10px;
    }
    display: flex;
    align-items: center;
  }

  padding: 10px 0 10px 20px;
  text-align: left;
  font-size: 16px;
  a {
    font-size: 13px;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
    color: black;
  }
  .last_node {
    font-weight: normal;
    font-size: 15px;
    cursor: pointer;
  }
`;
export const DotIcon = styled.div`
  height: 6px;
  width: 6px;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  margin: 0 10px;
`;
export const CardWrapper = styled.div`
  background-color: red;
`;
export const CardSubWrapper = styled.div`
  background-color: grey;
`;
export const SearchInbox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0 30px 0;
  /* padding: 0 10px; */
  width: 100%;
  align-items: center;
  justify-content: center;
`;
export const SearchSection = styled.div`
  display: block;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  outline: 2px solid transparent;
  outline-offset: 2px;
  font-size: 1.125rem;
  line-height: 1.75rem;
  padding: 0.8rem;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 30px;
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
      div {
        display: none;
      }
    }
  }
  div {
    display: flex;
    align-items: center;
  }
  input {
    height: 40px;
    width: 100%;
    border: none;
    outline: none;
  }
`;
export const IconSection = styled.div`
  display: flex;
`;
export const HistoryView = styled.div`
  background-color: #e6e6e6;
  height: 40px;
  padding: 0 10px;
  border-radius: 51px;
  width: fit-content;
  cursor: pointer;
`;
export const ImageLoader = styled.div`
  background-color: #e6e6e6;
  margin-left: 0;
  margin-right: auto;
  height: 40px;
  padding: 0 10px;
  border-radius: 51px;
  width: fit-content;
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
  margin-left: 15px;
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
export const TreeContainer = styled.div`
  position: relative;
  & > img {
    position: absolute;
    right: 28px;
    top: 28px;
    cursor: pointer;
  }
`;
