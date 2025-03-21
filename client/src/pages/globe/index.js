import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";
import axios from "axios";
import * as Styled from "./style";
import { useLocation, useParams } from "react-router-dom";

import { CiImageOn, CiLight } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import search from "../../assets/home/8.png";
import { useNavigate } from "react-router-dom";
import TextSearchResult from "./result";
import ImageSearchResult from "./imageresult";
import PDFSearchResult from "./pdfresult";
import TreeView from "./tree";
import { SearchInput } from "../../components/SearchInput";
import TagSelection from "./tagSelection";
import loadingSVG from "../../assets/loading.gif";

import icon from "../../assets/about/icon.png";
import galamboSearch from "../../assets/Galambo.png";
import backImg from "../../assets/Hide.png";
import { GoClock } from "react-icons/go";
import { useAppContext } from "../../context/AppContext";
import { Helmet } from "react-helmet";
import SearchBox from "../../components/searchBox";
import api from "../../configs/api";
const token = "_____";
export default function Globe() {
  const { query } = useParams();
  const [context] = useAppContext();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [result, setResult] = useState("");
  const [treeDes, setTreeDes] = useState("");
  const [fileType, setFileType] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [imageBinaryString, setImageBinaryString] = useState(null);
  const [pdfBinaryString, setPdfBinaryString] = useState(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState("");
  const [fileData, setFileData] = useState(null);
  const [searchVisible, onSearchVisible] = useState(false);
  const [searchData, setSearchData] = useState({
    type: null, // "text" | "image" | "pdf"
    data: null, // Contains the search result data
  });

  const [searchAry, setSearchAry] = useState([]);
  const [visible, setVisible] = useState(false);
  // const [imageData, setImageData] = useState();
  const location = useLocation();
  const { imageBinary, pdfBinary } = location.state || {};

  const navigate = useNavigate();
  const websocketURL =
    "wss://galamboo-backend-eydl.onrender.com/ws/discover_topics";
  let socket;

  const handleKeyPress = async (event, param) => {
    if (event.key === "Enter") {
      if (context.auth !== null) {
        const data = await api.post(`/manage/addhistory`, {
          id: context.auth.user.id,
          history: param,
        });
      }
      // navigate(`/search/${param}`);
      searchAry.push(param);
      setTreeDes(param);
      setSearchData({
        type: null,
        data: null,
      });
      navigate(`/search/${query + token + param}`);
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
      navigate(`/search/${query + token + result}`);
    }
  };
  const handleResetHistory = async (event, item) => {
    event.preventDefault();
    if (searchAry.length > 1) {
      const data = searchAry.filter((index) => index !== item);
      const newSearchKeywords = data.join(token);

      navigate(`/search/${encodeURIComponent(newSearchKeywords)}`);
      // await getResponseData(data);
      // setSearchAry(data);
    }
  };
  const getResponseData = async (result) => {
    setSearchData();
    setLoading(true);

    if (imageBinary) {
      // If imageBinary is available, use the image search endpoint
      const imageFormdata = new FormData();
      imageFormdata.append("file", imageBinary); // Add the binary image data
      try {
        const imgData = await axios.post(
          `https://dd3d-2401-4900-883f-de07-e975-4115-cc2b-861e.ngrok-free.app/search/`,
          imageFormdata
        );
        setSearchData({ type: "image", data: imgData.data });
        setHasError(false);
      } catch (error) {
        console.error("Image search error:", error);
        setLoading(false);
        setHasError(true);
      }
    } else if (pdfBinary) {
      // If pdfBinary is available, use the PDF search endpoint
      const pdfFormData = new FormData();
      pdfFormData.append("file", pdfBinary); // Add the binary PDF data
      try {
        const pdfData = await axios.post(
          `https://dd3d-2401-4900-883f-de07-e975-4115-cc2b-861e.ngrok-free.app/search/`,
          pdfFormData
        );
        setSearchData({ type: "pdf", data: pdfData.data });
        setHasError(false);
      } catch (error) {
        console.error("PDF search error:", error);
        setLoading(false);
        setHasError(true);
      }
    } else {
      // If neither image nor PDF is available, proceed with a text-based search
      if (result) {
        try {
          const formData = new FormData();
          formData.append("user_query", result);
          fetch(
            `https://dd3d-2401-4900-883f-de07-e975-4115-cc2b-861e.ngrok-free.app/search/`,
            {
              method: "POST",
              body: formData,
            }
          ).then((response) => {
            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            function readChunk() {
              return reader.read().then(({ done, value }) => {
                if (done) {
                  console.log("Stream complete");

                  return;
                }

                // Decode and process the chunk
                const chunk = decoder.decode(value, { stream: true });
                try {
                  setSearchData({ type: "text", data: JSON.parse(chunk) }); // Set the text search result
                  setLoading(false);
                  setHasError(false);
                } catch (error) {}

                // Read the next chunk
                return readChunk();
              });
            }
            return readChunk();
          });
          // axios
          //   .post(
          //     `https://dd3d-2401-4900-883f-de07-e975-4115-cc2b-861e.ngrok-free.app/search/`,
          //     formData,
          //     {
          //       responseType: "stream",
          //     }
          //   )
          //   .then((res) => {
          //     console.log(res);

          //     res.data.on("data", (chunk) => {
          //       // logic to process stream data
          //       console.log(chunk);
          //     });

          //     res.data.on("end", () => {
          //       // logic for stream complete
          //     });
          //   });
          // Readable Stream Event Handling
          // console.log(res);
          // res.data.on("data", (chunk) => {
          //   // Process each chunk as it arrives
          //   const strChunk = chunk.toString();
          //   // allChunks += strChunk;
          //   console.log(chunk.toObject());
          //   console.log(strChunk);

          //   // For updating state periodically (not on each chunk)
          //   // setData((prevData) => prevData + strChunk);
          // });

          // res.data.on("end", () => {
          //   // When streaming ends
          //   console.log("Streaming completed");
          // });

          // setSearchData({ type: "text", data: data.data }); // Set the text search result
          // setHasError(false);
        } catch (error) {
          console.error("Text search error:", error);
          setLoading(false);
          setHasError(true);
        }
      }
    }

    // setLoading(false); // Stop loading once the search is complete
  };

  const onCustomize = useCallback(
    async (param) => {
      const ls_query = query + encodeURIComponent(token) + param;
      navigate(`/search/${ls_query}`);
    },
    [query]
  );

  const handleBackBtn = async () => {
    if (context.auth) {
      const data = await api.post(`/manage/gethistory`, {
        id: context.auth.user.id,
      });
      if (data) {
        // setHistoryData(data.data.data);
        let numbers = 0;
        const history = data.data.data.history;
        history.sort((a, b) => a.date - b.date);
        if (searchAry.length > 1) {
          numbers = searchAry.length - 2;
        } else {
          history.map((item, key) => {
            if (item.keyword === searchAry[0]) {
              numbers = key - 1;
            }
          });
        }
        if ((numbers) => 0) {
          navigate(`/search/${history[numbers].keyword}`);
        }
      }
    }
  };

  // Establish WebSocket connection on component mount
  useEffect(() => {
    socket = new WebSocket(websocketURL);

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  const renderSearchResult = () => {
    if (!searchData) return null;

    if (searchData.type === "text") {
      return (
        <TextSearchResult
          tData={searchData.data.entities}
          imgData={searchData.data.images}
          onCustomize={onCustomize}
          current={treeDes}
        />
      );
    } else if (searchData.type === "image") {
      return <ImageSearchResult data={searchData.data} />;
    } else if (searchData.type === "pdf") {
      return <PDFSearchResult data={searchData.data} />;
    }

    return null;
  };

  useEffect(() => {
    console.log("Query");
    if (query) {
      setTreeDes(query);
      const ls = query.split(encodeURIComponent(token));
      setSearchAry(ls);
      getResponseData(query);
    } else if (imageBinary || pdfBinary) {
      const imageFormdata = new FormData();
      const pdfFormData = new FormData();
      // Append the image data to the FormData object under the 'file' field
      // Ensure `imageBinary` is a File or Blob
      handleSelect(result);
      imageFormdata.append("file", imageBinary); //
      pdfFormData.append("file", pdfBinary); //
      // If no query in the URL, use the binary data for image/PDF search
      getResponseData(imageFormdata || pdfFormData);
    }
  }, []);

  const handleButtonClick = (type) => {
    setFileType(type);
    // setTimeout(() => {
    //   fileInputRef.current.click();
    // }, 0);
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

  const treeData = useMemo(() => {
    if (searchData && searchData.data) {
      if (searchData.type === "text") {
        return searchData.data.entities ?? {};
      }

      return searchData.data.images.reduce((acc, cur) => {
        acc[cur.query] = "";
        return acc;
      }, {});
    }
    return undefined;
  }, [searchData]);

  return (
    <Styled.GlobeContainer>
      <Helmet>
        <title>Search Page Page | Galambo</title>
        <meta name="description" content="Search page of galambo" />
        <link rel="canonical" href="https://www.galambo.com/:query" />
      </Helmet>

      <Styled.MainContainer visible={visible}>
        {searchData && searchData.data && (
          <TreeView
            data={searchData.data.entities ?? {}}
            current={treeDes}
            visible={visible}
            setVisible={setVisible}
          />
        )}
        {/* <div> */}
        {hasError ? (
          <Styled.ErrorContainer>
            <Styled.BackBtn className="backBtn" onClick={handleBackBtn}>
              <img src={backImg} alt="back" width={10} height={18} />
              Go Back
            </Styled.BackBtn>
            <h2>We’re still working on this page.</h2>
            <p>Please check back later.</p>
            <img
              className="logo"
              itemProp="image"
              src={loadingSVG}
              alt="loading"
            />
          </Styled.ErrorContainer>
        ) : loading ? (
          <Styled.LoadContainer>
            <img itemProp="image" src={loadingSVG} alt="loading" />
          </Styled.LoadContainer>
        ) : (
          <div>
            <Styled.DataHeader>
              <Styled.SearchInbox>
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
                {/* <Styled.SearchSection>
                  <SearchInput
                    word={treeDes}
                    setResult={setResult}
                    handleKeyPress={handleKeyPress}
                    handleSelect={handleSelect}
                  />
                  <Styled.IconSection>
                    <Styled.ImageLoader>
                      <CiImageOn size={24} color="#000" />
                    </Styled.ImageLoader>
                    <Styled.HistoryView>
                      <GoClock size={24} color="#000" />
                    </Styled.HistoryView>
                    <Styled.SearchIcon onClick={() => handleSelect(result)}>
                      <img
                        itemProp="image"
                        src={search}
                        alt="search img"
                        width={30}
                      />
                    </Styled.SearchIcon>
                  </Styled.IconSection>
                </Styled.SearchSection> */}
                <Styled.SearchDiv>
                  <Styled.KeywordTag>
                    {treeDes ? (
                      searchAry.map((item, key) => (
                        <Styled.SearchHistory key={key}>
                          {item}
                          <a
                            rel="noreferrer"
                            href="#"
                            onClick={(e) => handleResetHistory(e, item)}
                          >
                            <IoIosClose color="white" />
                          </a>
                        </Styled.SearchHistory>
                      ))
                    ) : (
                      <TagSelection
                        query={query}
                        getResponseData={getResponseData}
                        setTreeDes={setTreeDes}
                      />
                    )}
                  </Styled.KeywordTag>
                  <Styled.SearchRgihtContainer>
                    <Styled.SearchMaybeTag>
                      Maybe you mean...{" "}
                      <label>
                        {searchAry.map((item, key) => (
                          <span>{item}</span>
                        ))}
                      </label>
                      <img
                        src={galamboSearch}
                        alt="galambo"
                        width={40}
                        height={45}
                      />
                    </Styled.SearchMaybeTag>
                    <Styled.BackBtn onClick={handleBackBtn}>
                      <img
                        src={backImg}
                        alt="back image"
                        width={10}
                        height={18}
                      />
                      Go Back
                    </Styled.BackBtn>
                  </Styled.SearchRgihtContainer>
                </Styled.SearchDiv>
              </Styled.SearchInbox>

              {!loading ? (
                <Styled.DataDescription>
                  <div>
                    <img
                      itemProp="image"
                      src={icon}
                      alt="icon img"
                      width={17}
                      height={18}
                    />
                  </div>
                  {searchData && (
                    <span>
                      {}
                      {searchData.type === "text" &&
                        searchData.data.description}
                      {searchData.type === "image" &&
                        searchData.data.description}
                      {searchData.type === "pdf" && searchData.data.description}
                    </span>
                  )}
                </Styled.DataDescription>
              ) : (
                ""
              )}

              {!loading ? (
                <Styled.SearchKeyWordDiv>
                  <Styled.SearchKeyWord>
                    {searchData.type === "text" &&
                      searchAry.map((item, key) => <span>{item}</span>)}
                    {searchData.type === "image" && "Related Images"}
                    {searchData.type === "pdf" && "Related Images"}
                  </Styled.SearchKeyWord>
                </Styled.SearchKeyWordDiv>
              ) : (
                ""
              )}
            </Styled.DataHeader>
            {renderSearchResult()}
          </div>
        )}

        {/* </div> */}
      </Styled.MainContainer>
    </Styled.GlobeContainer>
  );
}
