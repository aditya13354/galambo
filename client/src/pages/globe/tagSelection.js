import React, { useEffect, useState } from "react";
import * as Styled from "./style";
import { real_data } from "../../constant/temp";

const TagSelection = ({ getResponseData, setTreeDes, query }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [current, setCurrent] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  useEffect(() => {
    const queryData = real_data.filter((item) => item.title === query);
    if (queryData.length > 0) {
      setCurrent(query);
      setSearchQuery(query);
    }
  }, [query]);
  return (
    <Styled.SelectSection>
      <div>
        {real_data.map((item, key) => (
          <Styled.CategoryBtn
            selected={
              current === item.title
                ? true
                : searchQuery === item.title
                ? true
                : false
            }
            key={key}
            onClick={() => {
              setSearchQuery("");
              setCurrent(item.title);
            }}
          >
            {item.title}
          </Styled.CategoryBtn>
        ))}
      </div>
      {current && (
        <div>
          {real_data.map(
            (item) =>
              item[current] &&
              item[current].map((temp, key) => (
                <Styled.SubCategoryBtn
                  key={key}
                  selected={
                    current === item.title && temp.title === subCategory
                  }
                  onClick={async () => {
                    setSubCategory(temp.title);
                  }}
                >
                  {temp.title}
                </Styled.SubCategoryBtn>
              ))
          )}
        </div>
      )}
      {current && subCategory && (
        <div>
          {real_data.map(
            (item) =>
              item[current] &&
              item[current].map((temp) => {
                return temp.sub.map(
                  (data, index) =>
                    temp.title === subCategory && (
                      <Styled.SubCategoryBtn
                        key={index}
                        selected={
                          current === item.title &&
                          temp.title === subCategory &&
                          data === mainCategory
                        }
                        onClick={async () => {
                          await setMainCategory(data);
                          await setTreeDes(current);
                          await getResponseData(
                            current + ", " + subCategory + ", " + data
                          );
                        }}
                      >
                        {data}
                      </Styled.SubCategoryBtn>
                    )
                );
              })
          )}
        </div>
      )}
    </Styled.SelectSection>
  );
};
export default TagSelection;
