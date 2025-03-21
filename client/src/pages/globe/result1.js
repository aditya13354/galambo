import React, { useState, useCallback, useMemo } from "react";
import axios from "axios";
import * as Styled from "./style";
import { getJSONDepth } from "../../utils/getJSONDepth";
import ImageModal from "../../components/modal/ImageModal";
import { IoIosArrowForward } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";

const TextSearchResult = ({ tData, imgData, onCustomize, current }) => {
  const Card = ({ data, dataIndex, topParent = false, parent }) => {
    const treeData = Array.isArray(data) ? data : Object.keys(data);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [triggerPosition, setTriggerPosition] = useState({ x: 0, y: 0 });

    const [searchData, setSearchData] = useState([]);
    const [imageData, setImageData] = useState({});

    const images = (key) => {
      return imgData.find(
        (img) => img.topic === dataIndex && img.subtopic === key
      );
    };

    const handleImageModal = async (e, key, desc) => {
      e.preventDefault();
      const imgData = images(key);
      setImageData(imgData.images[desc]);
      const { data } = await axios.post(
        `https://berrygoodmedia.herokuapp.com/https://ml.galambo.com/summary?image_title=${desc}&image_topic=${dataIndex}`
      );
      if (data) {
        setSearchData(data.data);
      }
      setModalIsOpen(true);
      const rect = e.target.getBoundingClientRect();

      const x = rect.left + rect.width; // Horizontal center of button
      const y = rect.top + rect.height; // Vertical center of button

      setTriggerPosition({ x, y });
      setModalIsOpen(true);

      setName(desc);
    };

    const closeModal = () => {
      setModalIsOpen(false);
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
            {typeof data[key] === "object" &&
              Object.keys(data[key]).length > 0 && (
                <Card
                  data={data[key]}
                  dataIndex={dataIndex ? `${dataIndex}__${key}` : key}
                />
              )}
            <Styled.ImageCards>
              {getJSONDepth(data[key]) === 1 &&
                images(key) &&
                Object.keys(images(key).images).map((desc) => (
                  <Styled.DeatiledCard
                    key={desc}
                    onClick={(e) => handleImageModal(e, key, desc)}
                  >
                    {/* <div > */}
                    <LazyLoadImage
                      // src={"data:image/png;base64," + imgData[key]?.image}
                      src={images(key).images[desc].image}
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
                    <span>{desc}</span>
                    {/* </div> */}
                  </Styled.DeatiledCard>
                ))}
            </Styled.ImageCards>
            <ImageModal
              modalIsOpen={modalIsOpen}
              closeModal={closeModal}
              triggerPosition={triggerPosition}
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
        <Card data={tData ? tData : {}} dataIndex={""} />
      </Styled.ResultWrapper>
    </Styled.DataWrapper>
  );
};

export default React.memo(TextSearchResult);
