import { styled } from "styled-components";

export const FAQSectionWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1024px;
  width: 95%;
  margin: auto auto 100px auto;
  padding: 0;

  @media screen and (max-width: 768px) {
    /* padding: 70px 0; */
    h1 {
      margin-bottom: 35px;
      font-size: 26px;
    }
  }
  & > img {
    max-width: 200px;
    width: 95%;
  }
`;

export const FAQContainer = styled.div`
margin-top:2rem;
  div {
    & > :not(:first-child) {
      margin-top: 20px;
    }
    @media screen and (max-width: 768px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      & > :not(:first-child) {
        margin-top: 14px;
      }
    }
  }

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  @media screen and (max-width: 750px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
