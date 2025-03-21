import styled from "styled-components";

export const StyledSearchWrapper = styled.div`
  position: relative;
`;
export const StyledSearchInput = styled.input``;
export const SearchDropdown = styled.div`
  background-color: white;
  width: 75%;
  position: absolute;
  z-index: 100000;
  top: 60px;
  box-shadow: 0 4px 55.599998474121094px 0px #00000040;
  padding: 10px;
  box-sizing: border-box;
  * {
    font-size: 13px;
    text-align: left;
  }
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: auto;
  div {
    width: 100%;
    cursor: pointer;
    img {
      margin-right: 10px;
    }
  }
`;
