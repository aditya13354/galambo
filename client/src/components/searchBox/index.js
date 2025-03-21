import React, { useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CiImageOn, CiFileOn } from "react-icons/ci";
import { GoClock } from "react-icons/go";
import search from "../../assets/home/8.png"; // Adjust the path as needed
import * as Styled from "./style"; // Import your styled components
import { SearchInput } from "../SearchInput"; // Import your custom SearchInput component

const SearchBox = ({
  fileType,
  handleDrop,
  handleFileChange,
  handleButtonClick,
  handleKeyPress,
  handleSelect,
  imageSrc,
  pdfPreviewUrl,
  result,
  setResult,
  context,
  searchVisible,
  onSearchVisible,
}) => {
  const fileInputRef = useRef(null);

  return (
    <Styled.SearchInbox
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <Styled.SearchSection>
        <input
          type="file"
          ref={fileInputRef}
          accept={fileType === "image" ? "image/*" : ".pdf"}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <div>
          {imageSrc && (
            <LazyLoadImage
              src={imageSrc}
              alt="search_image"
              effect="blur"
              wrapperProps={{ style: { transitionDelay: "1s" } }}
              style={{
                objectFit: "contain",
                width: "40px",
                borderRadius: "10px",
              }}
            />
          )}

          {pdfPreviewUrl && (
            <iframe
              src={pdfPreviewUrl}
              title="PDF Preview"
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid #ccc",
              }}
            />
          )}
        </div>

        <SearchInput
          word={result}
          setResult={setResult}
          handleKeyPress={handleKeyPress}
          handleSelect={handleSelect}
        />

        <Styled.IconSection>
          <Styled.IconWrapper>
            <Styled.ImageLoader>
              <CiImageOn
                size={24}
                color="#000"
                onClick={() => {
                  handleButtonClick("image");
                  fileInputRef.current.click();
                }}
              />
            </Styled.ImageLoader>
            <Styled.ImageLoader>
              <CiFileOn
                size={24}
                color="#000"
                onClick={() => {
                  handleButtonClick("pdf");
                  fileInputRef.current.click();
                }}
              />
            </Styled.ImageLoader>
          </Styled.IconWrapper>

          <Styled.IconWrapper>
            {context.auth !== null && (
              <Styled.HistoryView
                onClick={() => onSearchVisible(!searchVisible)}
              >
                <GoClock size={24} color="#000" />
              </Styled.HistoryView>
            )}
            <Styled.SearchIcon onClick={() => handleSelect(result)}>
              <img itemProp="image" src={search} alt="search icon" width={30} />
            </Styled.SearchIcon>
          </Styled.IconWrapper>
        </Styled.IconSection>
      </Styled.SearchSection>
    </Styled.SearchInbox>
  );
};

export default SearchBox;
