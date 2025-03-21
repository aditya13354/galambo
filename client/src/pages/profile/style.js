import styled from "styled-components";

// export const ProfileContent = styled.div`
//   margin: 0 auto 100px auto;
//   button {
//     @media screen and (max-width: 400px) {
//       width: 90%;
//     }
//     margin-top: 15px;
//     padding: 10px 38px;
//     font-size: 13px;
//     position: relative;
//     background-color: transparent;
//     border: none;

//     &::before {
//       cursor: pointer;
//       content: "";
//       position: absolute;
//       top: 0;
//       right: 0;
//       bottom: 0;
//       left: 0;
//       border-radius: 20px;
//       padding: 2px;
//       background: linear-gradient(
//         to right,
//         #feb1a7 0%,
//         #ff8975 11%,
//         #fe8458 22%,
//         #feba61 33%,
//         #fed479 44%,
//         #d7eca7 55%,
//         #77e6bf 67%,
//         #13aeba 78%,
//         #016b99 89%,
//         #052e5d 100%
//       );
//       -webkit-mask: linear-gradient(#fff 0 0) content-box,
//         linear-gradient(#fff 0 0);
//       -webkit-mask-composite: destination-out;
//       mask-composite: exclude;
//     }
//   }
// `;
export const ProfileWrapper = styled.div`
  max-width: 1440px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 100px;
  padding: 20px;
`;

export const ProfileContainer = styled.div`
  margin: 50px;
  width: 842px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 640px) {
    margin: 10px;
  }
`;

export const ProfileUserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  img {
    width: 170px;
    height: 170px;
  }
  @media screen and (max-width: 768px) {
    img {
      width: 130px;
      height: 130px;
    }
  }
  @media screen and (max-width: 640px) {
    img {
      display: none;
    }
  }
`;

export const ProfileContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 60px;
  gap: 10px;
  font-size: 13px;
  @media screen and (max-width: 768px) {
    margin-left: 30px;
  }
  @media screen and (max-width: 640px) {
    margin-left: 0;
  }
`;

export const ProfileContentHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    text-transform: capitalize;
    margin: 0;
    font-size: 26px !important;
  }
  img {
    display: none !important;
  }
  @media screen and (max-width: 640px) {
    img {
      display: block !important;
      width: 70px;
      height: 70px;
    }
  }
`;

export const ProfileMobileContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    gap: 10px;
    button {
      padding: 12px 10px;
      background-color: #f2f2f2;
      border: none;
      border-radius: 50px;
      font-size: 11px;
      cursor: pointer;
    }
  }
  @media screen and (max-width: 640px) {
    flex-direction: column;
    /* justify-content: space-between; */
    /* width: auto; */
  }
`;

export const ProfileContentBody = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  @media screen and (max-width: 640px) {
    text-align: center;
  }
`;

export const ProfileContentFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
`;
