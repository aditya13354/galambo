import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Styled from "./style";

import { Helmet } from "react-helmet";

import { useAppContext } from "../../context/AppContext";
import { SearchInput } from "../../components/SearchInput";

import { GoClock } from "react-icons/go";
import { CiImageOn, CiFileOn } from "react-icons/ci";

import bot from "../../assets/home/bot.png";
import close from "../../assets/close.png";
import search from "../../assets/home/8.png";
import Title from "../../assets/title.png";

import { real_data } from "../../constant/temp";
import { format } from "date-fns";
import isEmpty from "../../utils/isEmpty";
import useOutsideClick from "../../utils/useOutside";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SearchBox from "../../components/searchBox";
import api from "../../configs/api";

const Home = () => {
  const modalRef = useRef();
  const [context] = useAppContext();
  const [result, setResult] = useState("");
  const [searchVisible, onSearchVisible] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null); // State to hold the image URL
  const [fileData, setFileData] = useState(null); // State to hold the image URL
  const [fileType, setFileType] = useState("");
  const [imageBinaryString, setImageBinaryString] = useState(null);
  const [pdfBinaryString, setPdfBinaryString] = useState(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState("");

  useEffect(() => {
    if (imageBinaryString || pdfBinaryString) {
      // Call handleSelect to trigger search once the file is ready
      handleSelect(result);
    }
  }, [imageBinaryString, pdfBinaryString]); // Re-run when the binary strings are set

  const handleButtonClick = (type) => {
    setFileType(type);
    // setTimeout(() => {
    //   fileInputRef.current.click();
    // }, 0);
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    processFile(file);
  };
  const processFile = (file) => {
    setFileData(file);
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImageSrc(e.target.result);
          const mimeType = file.type || "image/png";
          const imageBlob = base64ToBlob(
            e.target.result.split(",")[1],
            mimeType
          );
          setImageBinaryString(imageBlob);
        };
        reader.readAsDataURL(file);
        setPdfPreviewUrl(null);
      } else if (file.type === "application/pdf") {
        const reader = new FileReader();
        reader.onload = () => {
          const pdfBlob = new Blob([reader.result], {
            type: "application/pdf",
          });
          setPdfBinaryString(pdfBlob);
          setPdfPreviewUrl(URL.createObjectURL(pdfBlob));
          setImageSrc(null);
        };
        reader.readAsArrayBuffer(file);
      }
    }
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFileData(file);
    if (file) {
      if (fileType === "image") {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImageSrc(e.target.result);
          const mimeType = file.type || "image/png";
          const imageBlob = base64ToBlob(
            e.target.result.split(",")[1],
            mimeType
          );
          setImageBinaryString(imageBlob); // Set binary data for image
        };
        reader.readAsDataURL(file); // Read as base64 for preview
        setPdfPreviewUrl(null); // Clear PDF preview
      } else if (fileType === "pdf") {
        const reader = new FileReader();
        reader.onload = () => {
          const pdfBlob = new Blob([reader.result], {
            type: "application/pdf",
          });
          setPdfBinaryString(pdfBlob); // Set binary data for PDF
          setPdfPreviewUrl(URL.createObjectURL(pdfBlob)); // Preview URL for PDF
          setImageSrc(null); // Clear image preview
        };
        reader.readAsArrayBuffer(file); // Read as binary for PDF
      }
    }
  };

  // Function to convert base64 to Blob
  const base64ToBlob = (base64, mimeType) => {
    const byteCharacters = atob(base64); // Decode the base64 string
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      byteArrays.push(new Uint8Array(byteNumbers));
    }

    return new Blob(byteArrays, { type: mimeType });
  };
  const handleKeyPress = async (event, result) => {
    if (event.key === "Enter" && result) {
      if (context.auth !== null) {
        await api.post(`/manage/addhistory`, {
          id: context.auth.user.id,
          history: result,
        });
      }
      navigate(`/search/${result}`);
    }
  };

  const handleSelect = async (result) => {
    if (imageBinaryString) {
      if (!fileData) {
        alert("Please select a file first.");
        return;
      }

      // Navigate to search results page with image data
      navigate(`/search`, {
        state: { imageBinary: imageBinaryString }, // Pass as route state
      });

      // Optional: Save search history if user is authenticated
      if (context.auth !== null) {
        await api.post(`/manage/addhistory`, {
          id: context.auth.user.id,
          history: result,
        });
      }
    } else if (pdfBinaryString) {
      if (!fileData) {
        alert("Please select a file first.");
        return;
      }

      // Navigate to search results page with image data
      navigate(`/search`, {
        state: { pdfBinary: pdfBinaryString }, // Pass as route state
      });

      // Optional: Save search history if user is authenticated
      if (context.auth !== null) {
        await api.post(`/manage/addhistory`, {
          id: context.auth.user.id,
          history: result,
        });
      }
    }
    // Normal search navigation if no image selected
    else if (result) {
      if (context.auth !== null) {
        await api.post(`/manage/addhistory`, {
          id: context.auth.user.id,
          history: result,
        });
      }
      navigate(`/search/${result}`);
    }
  };
  useEffect(() => {
    if (context.auth !== null) {
      const getHistory = async () => {
        const data = await api.post(`/manage/gethistory`, {
          id: context.auth.user.id,
        });
        if (data) {
          setHistoryData(data.data.data);
        }
      };
      getHistory();
    }
  }, [context, searchVisible]);
  useOutsideClick({
    ref: modalRef,
    handler: () => onSearchVisible(false),
  });
  const handleHistorySelect = async (result) => {
    if (result) {
      navigate(`/search/${result}`);
      onSearchVisible(false);
    }
  };
  return (
    <Styled.StyledHome itemScope itemType="http://schema.org/WebPage">
      <Styled.SearchWrapper position={searchVisible ? "show" : "hide"}>
        <img
          onClick={() => onSearchVisible(false)}
          src={close}
          alt="close icon"
          width={12}
          height={12}
          style={{ position: "fixed", right: "18px", top: "18px" }}
        />
        <div ref={modalRef}>
          <p>Search History</p>
          <div>
            {!isEmpty(historyData) ? (
              historyData.history?.map((item, key) => (
                <div key={key}>
                  <p>{format(new Date(item.date), "MM/dd/yyyy")}</p>
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => handleHistorySelect(item.keyword)}
                  >
                    {item.keyword}
                  </p>
                </div>
              ))
            ) : (
              <p>No history</p>
            )}
          </div>
        </div>
      </Styled.SearchWrapper>
      <Helmet>
        <title>AI Image Search Engine - Galambo</title>
        <meta name="title" content="AI Image Search Engine - Galambo" />
        <meta
          name="description"
          content="Explore Galambo: the AI image search engine for finding relevant images and videos. Enjoy precise, intuitive searches and discover the perfect visual content."
        />

        <link rel="canonical" href="https://www.galambo.com/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "WebPage",
            name: "Home Page | Galambo",
            description: "Home page of Galambo",
            url: "https://www.galambo.com/",
            image: {
              "@type": "ImageObject",
              url: "https://www.galambo.com/assets/home/bot.png",
              width: 294,
              height: 163,
            },
          })}
        </script>
      </Helmet>
      <img
        itemProp="image"
        src={bot}
        alt="bot_image"
        width={294}
        height={163}
      />

      <img
        itemProp="image"
        src={Title}
        alt="title img"
        width={208}
        height={33}
      />
      <h2 itemProp="headline">See the World Differently</h2>
      <h1>Smart AI-Powered Image Search for Accurate Results</h1>
      <SearchBox
        fileType={fileType}
        handleDrop={handleDrop}
        handleFileChange={handleFileChange}
        handleButtonClick={handleButtonClick}
        handleKeyPress={handleKeyPress}
        handleSelect={handleSelect}
        imageSrc={imageSrc}
        pdfPreviewUrl={pdfPreviewUrl}
        result={result}
        setResult={setResult}
        context={context}
        searchVisible={searchVisible}
        onSearchVisible={onSearchVisible}
      />
      {/* <Styled.SearchInbox  onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop} >
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
                alt="search_iamge"
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
                  onClick={() => handleButtonClick("image")}
                />
              </Styled.ImageLoader>
              <Styled.ImageLoader>
                <CiFileOn
                  size={24}
                  color="#000"
                  onClick={() => handleButtonClick("pdf")}
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
      </Styled.SearchInbox> */}
      <h3>Popular topics...</h3>
      <Styled.TagSelection>
        {real_data.map((item, key) => (
          <Styled.TagBtn
            key={key}
            onClick={() => navigate(`/search/${item.title}`)}
          >
            <img itemProp="image" src={item.img} alt="img_item" />
            <span itemProp="name">{item.title}</span>
          </Styled.TagBtn>
        ))}
      </Styled.TagSelection>
    </Styled.StyledHome>
  );
};

export default Home;
