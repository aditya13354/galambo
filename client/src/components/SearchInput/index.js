import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import search from "../../assets/home/8.png";
import * as Styled from "./style";
import axios from "axios";
export const SearchInput = ({ handleKeyPress, handleSelect, setResult }) => {
  const [keyword, setKeyword] = useState("");

  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);

  const fetchSearchResults = async (searchQuery) => {
    console.log(searchQuery);
    // const formData = new FormData();
    // formData.append("q", searchQuery);
    try {
      const data = await axios.post(
        `https://berrygoodmedia.herokuapp.com/https://ml.galambo.com/suggestions?q=${searchQuery}`
      );
      if (data) {
        setSearchData(data.data);
      }
      setLoading(true);
    } catch (e) {
      console.error(e);
    }
  };
  const debouncedFetchSearchResults = debounce(fetchSearchResults, 500);
  const onKeywordSearch = (e) => {
    setLoading(false);
    setResult(e.target.value);
    setKeyword(e.target.value);
  };
  useEffect(() => {
    if (keyword.length > 2) {
      debouncedFetchSearchResults(keyword);
    }

    // Cleanup function to cancel debounce on component unmount
    return () => {
      debouncedFetchSearchResults.cancel();
    };
  }, [keyword]);
  return (
    <Styled.StyledSearchWrapper>
      <Styled.StyledSearchInput
        placeholder="Start Searching Now"
        value={keyword}
        onChange={(e) => onKeywordSearch(e)}
        onKeyDown={(e) => handleKeyPress(e, keyword)}
      />
      {loading && searchData && keyword.length > 2 && (
        <Styled.SearchDropdown>
          {searchData.map((item, key) => (
            <div key={key} onClick={() => handleSelect(item)}>
              <img
                itemProp="image"
                src={search}
                width={15}
                alt="keyword input"
              />
              <span>{item}</span>
            </div>
          ))}
        </Styled.SearchDropdown>
      )}
    </Styled.StyledSearchWrapper>
  );
};
