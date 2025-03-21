import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import * as Styled from "./style";
import isEmpty from "../../utils/isEmpty";
import { FaExternalLinkAlt } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiOutlineClose } from "react-icons/ai";
import open from "../../assets/open.png";

const ImageModal = ({
  modalIsOpen,
  closeModal,
  data,
  name,
  searchData,
  triggerPosition,
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  const handleClose = () => {
    closeModal();
    setIsClosing(false);
  };

  if (!modalIsOpen) return null;

  return (
    <div
      className={`modal ${modalIsOpen && !isClosing ? "show" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`modal-content ${isClosing ? "closing" : ""}`}
        style={{
          transformOrigin: `${triggerPosition.x - windowSize.width / 2}px ${
            triggerPosition.y - windowSize.height / 2
          }px`,
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <Styled.ImageHeader>
          <span>{name}</span>
          <Styled.IconView>
            <a
              href={!isEmpty(data) && data.contextLink}
              target="_blank"
              rel="noreferrer"
            >
              <div>
                <img src={open} alt="open" />
              </div>
            </a>
            <AiOutlineClose
              size={18}
              cursor={"pointer"}
              onClick={() => closeModal()}
              color="#2D2D2D"
            />
          </Styled.IconView>
        </Styled.ImageHeader>
        <p style={{ paddingRight: "15px", paddingLeft: "15px" }}>
          {searchData}
        </p>
        <Styled.ImageContent>
          <LazyLoadImage
            src={!isEmpty(data) && data.image}
            alt="search_iamge"
            effect="blur"
            wrapperProps={{
              style: {
                transitionDelay: "1s",
              },
            }}
          />
        </Styled.ImageContent>
      </div>
    </div>
  );
};

export default ImageModal;
