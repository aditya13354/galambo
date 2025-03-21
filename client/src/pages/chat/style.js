import styled from "styled-components";

export const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  /* margin-bottom: 100px; */
  border-top: 2px solid #d1d1d1;

  .user-avatar {
    border-radius: 100%;
  }
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  /* max-width: 1440px; */
  width: 100%;
  margin: 0 auto;
  height: 100%;
`;

export const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 100%;
  margin-left: 42px;
  margin-right: 10px;
`;

export const userListHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 14px 25px;
  h1 {
    font-size: 26px;
    font-weight: 600;
    color: #000000;
  }
`;

export const UserListContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex: 1;
  div {
    padding: 14px 24px;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    border-bottom: 1px solid #eaecf0;
    margin-right: 15px;
    span {
      font-size: 14px;
      font-weight: 500;
      color: #101828;
    }
    img {
      width: 40px;
      height: 40px;
    }
  }
`;

export const MessageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-left: 2px solid #d1d1d1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const MessageHeader = styled.div`
  width: 100%;
  /* padding: 14px 28px; */
  border-bottom: 1px solid #d1d1d1;
  nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 14px 28px;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 15px;
      img {
        width: 57px;
        height: 57px;
      }
      p {
        margin: 0;
        font-size: 20px;
        font-weight: 500;
      }
    }
    svg {
      cursor: pointer;
    }
  }
`;

export const SentMessage = styled.div`
  align-self: flex-end;
  background: #052e5d;
  color: #fff;
  padding: 5px 10px 5px 10px;
  border-radius: 25px;
  min-width: 10%;
  max-width: 50%;
  margin: 5px 0;
  display: flex;
  flex-direction: column;

  strong {
    font-weight: bold;
  }

  p {
    margin: 5px 0;
  }

  img {
    max-width: 100px;
    border-radius: 8px;
    margin-top: 5px;
  }
`;

export const ReceivedMessage = styled.div`
  align-self: flex-start;
  background-color: #f5f5f5;
  color: #000;
  padding: 5px 10px 5px 10px;
  border-radius: 25px;
  min-width: 10%;
  max-width: 60%;
  margin: 5px 0;
  display: flex;
  flex-direction: column;

  strong {
    font-weight: bold;
  }

  p {
    margin: 5px 0;
  }

  img {
    max-width: 100px;
    border-radius: 8px;
    margin-top: 5px;
  }
`;

export const MessageContent = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
  overflow-y: auto;
  width: 95%;
  padding-bottom: 1rem;
  overflow-y: auto;
`;

export const MessageInput = styled.div`
  /* position: absolute; */
  bottom: 0;
  width: 100%;
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #f6f6f6;
    border-radius: 24px;
    margin: 0 14px;
    gap: 10px;
    padding: 12px 30px 12px 20px;
    color: #8080808c;
    input {
      border: none;
      width: 100%;
      background-color: #f6f6f6;
      outline: none;
      font-size: 13px;
    }
  }
  svg {
    cursor: pointer;
  }
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 265px;
  width: 100%;
`;

export const DetailHeader = styled.div`
  border-left: 1px solid #d1d1d1;
  border-bottom: 1px solid #d1d1d1;
  padding: 43px 10px 10px 10px;
  h1 {
    font-size: 26px;
    font-weight: 600;
    margin: 0;
    text-align: left;
  }
`;

export const DetailContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  text-align: left;
  padding: 20px;
  p {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
    color: #fe4b4c;
    cursor: pointer;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 1rem 1rem 1rem 1rem;
  border-radius: 8px;
  max-width: 40%;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;
export const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 10px;
  margin-top: 10px;
`;

// Styled wrapper for the input
export const InputWrapper = styled.div`
  display: flex; /* Use flex to align items */
  align-items: center; /* Center vertically */
  gap: 0.5rem;
  width: 95%;
  margin-bottom: 10px;
  background: #f2f2f2;
  border-radius: 30px;
  padding: 0.4rem 1rem;
`;

// Styled uneditable text
export const InputLabel = styled.span`
  white-space: nowrap; /* Prevent label text from wrapping */
  display: flex; /* Flex to center label text vertically */
  align-items: center; /* Center label text */
  position: relative; /* For better positioning */
  color: #000; /* Color of the uneditable text */
  pointer-events: none; /* Prevent any interaction */
  font-weight: bolder;
`;

// Styled input
export const InputModal = styled.input`
  margin: 0;

  border: none; /* Add a border */
  background: #f2f2f2;
  &:focus {
    border: none;
    outline: none; /* Remove outline */
  }
`;

export const ModalButton = styled.button`
  margin-top: 2rem;
  border: none;
  background: ${(props) =>
    props.disabled
      ? "#ccc"
      : "#052e5d"}; // Set color for disabled and active states
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  color: #fff;
  border-radius: 10px;
  padding: 10px 10px;
  width: 100%;
`;
// Styled container
export const ModalHeder = styled.div`
  display: flex; /* Use flexbox to arrange items */
  justify-content: space-between; /* Space between text and icon */
  align-items: center; /* Center items vertically */
`;

// Styled text
export const ModalHeaderText = styled.span`
  flex-grow: 1; /* Allow the text to grow and take available space */
  text-align: center; /* Center the text */
  color: black; /* Text color */
`;
export const UserItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0; /* Color when hovering over a user */
  }

  &.selected {
    background-color: #f0f0f0; /* Color when user is selected */
  }
`;

export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;
export const UserName = styled.span`
  margin-top: 5px;
  font-size: 12px;
`;

export const IncomingFriendRequest = styled.div`
  max-width: 500px;
  margin: auto auto 80px;

  p {
    margin-bottom: 17px;
    line-height: 22px;
    letter-spacing: -0.4px;
  }

  .buttons-wrapper {
    display: flex;
    gap: 12px;
  }

  button {
    cursor: pointer;
    flex: 1 1 auto;
    padding: 10px 18px;
    font-weight: 500;
    line-height: 24px;
    border: 1px solid;
    border-radius: 100px;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);

    &.decline {
      border-color: #d0d5dd;
      background-color: #fff;
    }

    &.accept {
      border-color: transparent;
      background-color: #f3f3f3;
    }
  }

  @media screen and (max-width: 768px) {
    .buttons-wrapper {
      flex-direction: column;
    }
  }
`;
