import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Helmet } from "react-helmet";
import { FiEdit2 } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import { BsEmojiSmile, BsCardImage } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react"; // Import emoji picker
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import * as Styled from "./style";
import UserImg from "../../assets/user1.png";
import DefaultImg from "../../assets/header/default.png";
import { useAppContext } from "../../context/AppContext";
import { IoIosClose } from "react-icons/io";
import api from "../../configs/api";
import { db } from "../../configs/firebase";

const Chat = () => {
  const [isDetail, setIsDetail] = useState(false);
  const [selected, setSelected] = useState(0);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [image, setImage] = useState(null); // State for the selected image
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // State for the selected user from search results
  const [chatList, setChatList] = useState([]); // New state for the chat list
  const [isLoading, setIsLoading] = useState(false);
  const [activeAdd, setActiveAdd] = useState(true);
  const [context] = useAppContext();

  useEffect(() => {
    fetchChatList();
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messagesArr = [];
      querySnapshot.forEach((doc) => {
        messagesArr.push({ id: doc.id, ...doc.data() });
      });
      console.log(messagesArr);
      setMessages(messagesArr);
    });

    return () => unsubscribe();
  }, []);

  const isRequestFrom = useMemo(() => {
    return chatList[selected]?.from._id === context.auth.user.id;
  }, [chatList, selected, context.auth.user.id]);

  const fetchChatList = async () => {
    try {
      const { data } = await api.get(`/chat/chatlist/${context.auth.user.id}`);

      setChatList(data.error ? [] : data);
    } catch (error) {
      console.error("Error fetching chat list:", error);
    }
  };

  const sendMessage = async () => {
    if ((message || image) && chatList[selected]) {
      const chatMessage = {
        sender: context.auth.user.id,
        receiver: isRequestFrom
          ? chatList[selected].to._id
          : chatList[selected].from._id,
        text: message || "",
        image: image || null, // Include image if provided
        timestamp: new Date(),
      };
      setIsLoading(true);
      try {
        await addDoc(collection(db, "messages"), chatMessage);
        setMessage("");
        setImage(null);
      } catch (error) {
        console.error("Error sending message:", error);
        alert("Failed to send message. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onEmojiClick = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji); // Append emoji to the message
    setShowEmojiPicker(false);
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes

      if (file.size > maxSize) {
        alert("File size exceeds 5MB. Please upload a smaller image.");
        return;
      }

      // Resize image before uploading (you can use libraries like "pica" or "canvas")
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); // Store base64-encoded string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.length > 0) {
      try {
        const { data } = await api.get(`/users/searches?query=${query}`);
        setSearchResults(data); // Update search results with backend data
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]); // Clear results if query is empty
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query); // Update search query
    handleSearch(query);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setActiveAdd(false);
  };

  const addChatUser = async () => {
    if (
      selectedUser &&
      !chatList.some((user) => user.chatWith._id === selectedUser._id)
    ) {
      try {
        await api.post(`/chat/friend-request`, {
          from: context.auth.user.id,
          to: selectedUser._id,
        });

        alert("Friend request sent successfully!");
      } catch (error) {
        console.error("Error saving chat user:", error);
        alert(error || "Error sending friend request");
        return;
      }

      // Clear modal and search states
      setShowModal(false);
      setSearchQuery("");
      setSearchResults([]);
      setSelectedUser(null);
    }
  };

  // New function to handle key down events
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default action (new line)
      sendMessage(); // Send the message
    }
  };
  const clearModalState = () => {
    setSearchQuery(""); // Clear search query
    setSearchResults([]); // Clear search results
    setSelectedUser(null); // Deselect any selected user
    setActiveAdd(true); // Disable the chat button
    setShowModal(false); // Close the modal
  };

  const respondToRequest = async (status) => {
    try {
      await api.post(`/chat/friend-respond`, {
        id: chatList[selected]._id,
        status,
      });

      if (status === "accepted") {
        setChatList((prev) => {
          const updatedList = [...prev];
          updatedList[selected].status = "accepted";
          return updatedList;
        });
      } else {
        setChatList((prev) => prev.filter((_, index) => index !== selected));
        setSelected(0);
      }
    } catch (error) {
      console.error("Error responding to request:", error);
    }
  };

  return (
    <React.Fragment>
      <Styled.ChatWrapper>
        <Helmet>
          <title>Chat Page | Galambo</title>
          <meta name="description" content="Chat page of galambo" />
          <link rel="canonical" href="https://www.galambo.com/message" />
        </Helmet>
        <Styled.ChatContainer>
          <Styled.UserListContainer>
            <Styled.userListHeader>
              <h1>Messages</h1>

              <FiEdit2
                onClick={() => setShowModal(true)}
                style={{ cursor: "pointer" }}
              />
            </Styled.userListHeader>
            <Styled.UserListContent>
              {chatList && chatList.length > 0 ? ( // Check if chatList is not null and has users
                chatList.map((user, key) => (
                  <div
                    key={
                      user.from._id === context.auth.user.id
                        ? user.to._id
                        : user.from._id
                    }
                    className={selected === key ? "active-chat" : ""}
                    onClick={() => setSelected(key)}
                  >
                    <img
                      className="user-avatar"
                      src={
                        user.from._id === context.auth.user.id
                          ? user.to.photo
                            ? process.env.REACT_APP_BACKEND_API + user.to.photo
                            : DefaultImg
                          : user.from.photo
                          ? process.env.REACT_APP_BACKEND_API + user.from.photo
                          : DefaultImg
                      }
                      alt="user avatar"
                    />
                    <span>
                      {user.from._id === context.auth.user.id
                        ? user.to.name
                        : user.from.name}
                    </span>{" "}
                    {/* Display the user's name */}
                  </div>
                ))
              ) : (
                <p>No chats available.</p> // Message if no chats
              )}
            </Styled.UserListContent>
          </Styled.UserListContainer>
          <Styled.MessageContainer>
            <Styled.MessageHeader>
              <nav>
                <div>
                  <img
                    className="user-avatar"
                    src={
                      selected < chatList.length
                        ? isRequestFrom
                          ? chatList[selected].to.photo
                            ? process.env.REACT_APP_BACKEND_API +
                              chatList[selected].to.photo
                            : DefaultImg
                          : chatList[selected].from.photo
                          ? process.env.REACT_APP_BACKEND_API +
                            chatList[selected].from.photo
                          : DefaultImg
                        : DefaultImg
                    }
                    alt="user avatar"
                  />
                  <p>
                    {selected < chatList.length
                      ? isRequestFrom
                        ? chatList[selected].to.name
                        : chatList[selected].from.name
                      : "Select a chat"}
                  </p>
                </div>
                <HiDotsVertical
                  size={30}
                  onClick={() => setIsDetail(!isDetail)}
                />
              </nav>
            </Styled.MessageHeader>
            <Styled.MessageContent>
              {selected < chatList.length &&
                (chatList[selected].status === "accepted" ? (
                  messages
                    .filter((msg) =>
                      isRequestFrom
                        ? (msg.sender === chatList[selected].to._id &&
                            msg.receiver === context.auth.user.id) ||
                          (msg.receiver === chatList[selected].to._id &&
                            msg.sender === context.auth.user.id)
                        : (msg.sender === chatList[selected].from._id &&
                            msg.receiver === context.auth.user.id) ||
                          (msg.receiver === chatList[selected].from._id &&
                            msg.sender === context.auth.user.id)
                    )
                    .map((msg, index) =>
                      msg.sender === context.auth.user.id ? (
                        <Styled.SentMessage key={index}>
                          <p>{msg.text}</p>
                          {msg.image && <img src={msg.image} alt="uploaded" />}
                        </Styled.SentMessage>
                      ) : (
                        <Styled.ReceivedMessage key={index}>
                          <p>{msg.text}</p>
                          {msg.image && <img src={msg.image} alt="uploaded" />}
                        </Styled.ReceivedMessage>
                      )
                    )
                ) : (
                  <Styled.IncomingFriendRequest>
                    <p>
                      <b>
                        {isRequestFrom
                          ? chatList[selected].to.name
                          : chatList[selected].from.name}
                      </b>{" "}
                      want to share some content with you.
                      <br /> But there are no friends yet. Do you want to accept
                      the message?
                    </p>
                    <div className="buttons-wrapper">
                      <button
                        className="decline"
                        onClick={() => respondToRequest("rejected")}
                      >
                        Cancel
                      </button>
                      <button
                        className="accept"
                        onClick={() => respondToRequest("accepted")}
                      >
                        Accept
                      </button>
                    </div>
                  </Styled.IncomingFriendRequest>
                ))}
              {showEmojiPicker && (
                <EmojiPicker
                  style={{ position: "absolute", bottom: "40px", right: "0" }}
                  onEmojiClick={onEmojiClick}
                />
              )}
            </Styled.MessageContent>

            <Styled.MessageInput>
              <div>
                <input
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <BsEmojiSmile
                  size={18}
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  id="imageUpload"
                />
                <label htmlFor="imageUpload">
                  <BsCardImage size={18} />
                </label>
                <button onClick={sendMessage}>Send</button>
              </div>
              {image && (
                <div>
                  <img
                    src={image}
                    alt="preview"
                    style={{ maxWidth: "100px", marginTop: "5px" }}
                  />
                </div>
              )}
            </Styled.MessageInput>
          </Styled.MessageContainer>
          {isDetail && (
            <Styled.DetailContainer>
              <Styled.DetailHeader>
                <h1>Details</h1>
              </Styled.DetailHeader>
              <Styled.DetailContent>
                <p>Block</p>
                <p>Delete Chat</p>
              </Styled.DetailContent>
            </Styled.DetailContainer>
          )}

          {/* Modal for searching users */}
          {showModal && (
            <Styled.ModalOverlay>
              <Styled.ModalContent>
                <Styled.ModalHeder>
                  <Styled.ModalHeaderText>New message</Styled.ModalHeaderText>{" "}
                  {/* Centered text */}
                  <IoIosClose
                    style={{ cursor: "pointer" }}
                    onClick={clearModalState}
                    color="black"
                    size={30}
                  />{" "}
                  {/* Icon at the end */}
                </Styled.ModalHeder>

                <hr />
                <Styled.InputWrapper>
                  <Styled.InputLabel>To:</Styled.InputLabel>
                  <Styled.InputModal
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleInputChange}
                  />
                </Styled.InputWrapper>
                <Styled.UserGrid>
                  {searchResults.map((user) => (
                    <Styled.UserItem
                      key={user._id}
                      onClick={() => handleUserSelect(user)}
                      className={
                        selectedUser?._id === user._id ? "selected" : ""
                      }
                    >
                      <Styled.Avatar
                        src={
                          user.photo
                            ? process.env.REACT_APP_BACKEND_API + user.photo
                            : DefaultImg
                        }
                      />
                      <Styled.UserName>{user.name}</Styled.UserName>{" "}
                      {/* Show user's name */}
                    </Styled.UserItem>
                  ))}
                </Styled.UserGrid>
                <Styled.ModalButton disabled={activeAdd} onClick={addChatUser}>
                  Chat
                </Styled.ModalButton>
              </Styled.ModalContent>
            </Styled.ModalOverlay>
          )}
        </Styled.ChatContainer>
      </Styled.ChatWrapper>
    </React.Fragment>
  );
};

export default Chat;
