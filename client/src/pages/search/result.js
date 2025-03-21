import React, { useState, useCallback } from "react";
import axios from "axios";
import * as Styled from "./style";
import { getJSONDepth } from "../../utils/getJSONDepth";
import ImageModal from "../../components/modal/ImageModal";
import { IoIosArrowForward } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";

const SearchResult = ({ tData, imgData, onCustomize, current }) => {
  const Card = ({ data, dataIndex, topParent = false }) => {
    const treeData = Array.isArray(data) ? data : Object.keys(data);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [animationState, setAnimationState] = useState("closed");
    const [searchData, setSearchData] = useState([]);
    const [imageData, setImageData] = useState({});

    const handleImageModal = async (e, key) => {
      console.log("Click");
      e.preventDefault();
      setImageData(imgData[key]);
      const { data } = await axios.post(
        `https://berrygoodmedia.herokuapp.com/https://ml.galambo.com/summary`,
        { title: current, topic: key }
      );
      if (data) {
        setSearchData(data.data);
      }
      setModalIsOpen(true);
      setTimeout(() => setAnimationState("opening"), 10);
      setName(key);
    };

    const closeModal = () => {
      setAnimationState("closing");
      setTimeout(() => {
        setModalIsOpen(false);
        setAnimationState("closed");
      }, 500); // Match the duration with the transition time
    };

    const memoizedHandleCustomize = useCallback(
      (key) => () => {
        onCustomize(key);
      },
      [onCustomize]
    );

    return (
      <div className="parent">
        {treeData.map((key) => (
          <div
            className={`sub ${
              getJSONDepth(data[key]) === 1
                ? "last_sub"
                : getJSONDepth(data[key]) < 1 && "last_col"
            }`}
            key={key}
            id={`${dataIndex} ${key}`}
          >
            {getJSONDepth(data[key]) > 1 &&
              getJSONDepth(data[key]) !== getJSONDepth(tData.data) - 1 && (
                <Styled.SearchHistory key={key}>
                  {key}
                  <a rel="noreferrer" href="#">
                    <IoIosArrowForward color="white" />
                  </a>
                </Styled.SearchHistory>
              )}
            {getJSONDepth(data[key]) < 2 && (
              <span
                className={`tree`}
                style={{ cursor: "pointer" }}
                onClick={memoizedHandleCustomize(key)}
              >
                {key}
              </span>
            )}
            {getJSONDepth(data[key]) < 1 && (
              <Styled.DeatiledCard onClick={(e) => handleImageModal(e, key)}>
                <LazyLoadImage
                  // src={"data:image/png;base64," + imgData[key]?.image}
                  src={imgData[key]?.image}
                  alt="search_iamge"
                  effect="blur"
                  wrapperProps={{
                    style: { transitionDelay: "1s", width: "100%" },
                  }}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "auto",
                    maxWidth: "unset !important",
                  }}
                />
                <span>{imgData[key]?.description}</span>
              </Styled.DeatiledCard>
            )}
            {typeof data[key] === "object" &&
              Object.keys(data[key]).length > 0 && (
                <Card data={data[key]} dataIndex={`${dataIndex} ${key}`} />
              )}
            <ImageModal
              modalIsOpen={modalIsOpen}
              closeModal={closeModal}
              animationState={animationState}
              data={imageData}
              name={name}
              searchData={searchData}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <Styled.DataWrapper>
      <Styled.ResultWrapper>
        <Card data={tData ? tData.data : {}} dataIndex={""} />
      </Styled.ResultWrapper>
    </Styled.DataWrapper>
  );
};

export default React.memo(SearchResult);
