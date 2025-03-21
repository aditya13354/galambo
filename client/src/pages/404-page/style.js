import styled from "styled-components";

export const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  h1,
  h2,
  h3 {
    font-weight: lighter !important;
    font-family: "Montserrat" !important;
    margin: 0;
  }
  h1 {
    font-size: 107px;
  }
  h2 {
    font-size: 47px;
  }
  h3 {
    font-size: 13px;
    max-width: 444px;
    margin-top: 10px;
  }
  a {
    text-decoration: none;
    color: #2d2d2d;
    div {
      padding: 9px 53px;
      box-sizing: border-box;
      margin-top: 52px;
      position: relative;
      width: fit-content;
      p {
        font-size: 13px;
        padding: 0;
        margin: 0;
      }
      &::before {
        content: "";
        border-radius: 20px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
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
