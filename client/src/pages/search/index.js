import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import * as Styled from "./style";
import { useLocation, useParams } from "react-router-dom";

import { CiImageOn, CiLight } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import search from "../../assets/home/8.png";
import { useNavigate } from "react-router-dom";
import SearchResult from "./result";
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
import api from "../../configs/api";
const token = "_____";
export default function Globe() {
  const { query } = useParams();
  const [context] = useAppContext();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [treeDes, setTreeDes] = useState("");
  const [searchData, setSearchData] = useState();
  const [searchAry, setSearchAry] = useState([]);
  const [visible, setVisible] = useState(false);
  // const [imageData, setImageData] = useState();
  const navigate = useNavigate();
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
      await setTreeDes(param);
      await setSearchData();
      navigate(`/search/${query + token + param}`);
    }
  };
  const handleSelect = async (result) => {
    if (result) {
      if (context.auth !== null) {
        const data = await api.post(`/manage/addhistory`, {
          id: context.auth.user.id,
          history: result,
        });
      }
      navigate(`/search/${result}`);
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
    const res = await axios(
      {
        method: "post",
        url: `https://aaf2-2401-4900-883f-de07-1db5-a569-6e8d-7841.ngrok-free.app/search/`,
        responseType: "stream",
      },
      {
        user_id: "default",
        user_query: result,
      }
    );

    let allChunks = "";

    // Readable Stream Event Handling
    res.data.on("data", (chunk) => {
      // Process each chunk as it arrives
      const strChunk = chunk.toString();
      allChunks += strChunk;
      console.log(chunk.toObject());
      console.log(strChunk);

      // For updating state periodically (not on each chunk)
      // setData((prevData) => prevData + strChunk);
    });

    res.data.on("end", () => {
      // When streaming ends
      console.log("Streaming completed");
    });
    // if (data) {
    //   setSearchData(data.data);
    //   setLoading(false);
    // }
  };
  const onCustomize = useCallback(
    async (param) => {
      const ls_query = query + encodeURIComponent(token) + param;
      navigate(`/search/${ls_query}`);
    },
    [query]
  );

  const handleBackBtn = async () => {
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
  };

  useEffect(() => {
    // setSearchData(tempNewData);
    if (query) {
      // console.log(query);
      setTreeDes(query);
      const ls = query.split(encodeURIComponent(token));

      // console.log(searchAry);
      setSearchAry(ls);
      // const push_data = searchAry.push(query);
      getResponseData(ls);
    }
  }, [query]);
  return (
    <Styled.GlobeContainer>
      <Helmet>
        <title>Search Page Page | Galambo</title>
        <meta name="description" content="Search page of galambo" />
        <link rel="canonical" href="https://www.galambo.com/:query" />
      </Helmet>
      <Styled.MainContainer visible={visible}>
        {searchData && (
          <TreeView
            data={searchData.data}
            current={treeDes}
            visible={visible}
            setVisible={setVisible}
          />
        )}

        <div>
          {loading ? (
            <Styled.LoadContainer>
              <img itemProp="image" src={loadingSVG} alt="loading" />
            </Styled.LoadContainer>
          ) : (
            <Styled.DataHeader>
              <Styled.SearchInbox>
                <Styled.SearchSection>
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
                </Styled.SearchSection>
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
                  <span>{searchData && searchData.description}</span>
                </Styled.DataDescription>
              ) : (
                ""
              )}

              {!loading ? (
                <Styled.SearchKeyWordDiv>
                  <Styled.SearchKeyWord>
                    {searchAry.map((item, key) => (
                      <span>{item}</span>
                    ))}
                  </Styled.SearchKeyWord>
                </Styled.SearchKeyWordDiv>
              ) : (
                ""
              )}
            </Styled.DataHeader>
          )}
          {searchData && (
            <SearchResult
              tData={searchData}
              imgData={searchData.Images}
              onCustomize={onCustomize}
              current={treeDes}
            />
          )}
        </div>
      </Styled.MainContainer>
    </Styled.GlobeContainer>
  );
}
