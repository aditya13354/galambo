import styled from "styled-components";

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
  justify-content:space-between;
`;
export const IconWrapper  = styled.div`
display: flex;
align-items:center;
gap:1rem;
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