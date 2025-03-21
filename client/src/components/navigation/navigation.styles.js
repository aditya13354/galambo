import { styled } from "styled-components";

export const NavigationWrapper = styled.div`
  background: linear-gradient(
    90deg,
    rgba(254, 177, 167, 0.5),
    rgba(255, 137, 117, 0.5),
    rgba(254, 132, 88, 0.5),
    rgba(254, 186, 97, 0.5),
    rgba(254, 212, 121, 0.5),
    rgba(215, 236, 167, 0.5),
    rgba(119, 230, 191, 0.5),
    rgba(19, 174, 186, 0.5),
    rgba(1, 107, 153, 0.5),
    rgba(5, 46, 93, 0.5)
  );
`;

export const NavigationContainer = styled.div`
  max-width: 1440px;
  padding: 42px;
  margin: auto;
  @media screen and (max-width: 1024px) {
    padding: 20px;
  }
`;

export const FooterLogo = styled.img`
  margin-bottom: 56px;
`;

export const NavigationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-bottom: 70px;
  gap: 49px;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const NavigationListWrapper = styled.div`
  & > :not(:first-child) {
    margin-top: 64px;
  }
`;

export const NavigationListContent = styled.div`
  color: #fff;
  h2 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 24px;
    color: #1d1d1d;
    text-align: left;
  }
  a {
    display: block;
    text-align: left;
    text-decoration: none;
    color: #999999;
    font-size: 16px;
    font-weight: 400;
    &:not(:first-child) {
      margin-bottom: 18px;
    }
  }
`;

export const DownloadButtonWrapper = styled.div`
  display: flex;
  a {
    &:not(:first-child) {
      margin-left: 12px;
    }
  }
`;

export const CopyrightWrapper = styled.div`
  padding-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    text-decoration: none;
    color: black;
    /* margin-left: 10px;
    margin-right: 10px; */
  }
  span {
    color: #000000;
    font-size: 10px;
    font-weight: 400;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const FooterContent = styled.div`
  order: 1;
  @media screen and (max-width: 768px) {
    order: 3;
  }
`

export const FooterItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  font-size: 13px;
  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;
  }
  order: 2;
  @media screen and (max-width: 768px) {
    order: 1;
    flex-direction: column;
    gap: 10px;
    div {
      align-items: center;
    };
  }
`

export const SocialsNavWrapper = styled.div`
  display: flex;
  gap: 6px;
  order: 3;
  @media screen and (max-width: 768px) {
    order: 2;
  }
`;
