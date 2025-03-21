import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IoIosArrowForward } from "react-icons/io";
import * as Styled from "./style";
const ImageSearchResult = ({ data }) => {
  // Access the 'images' data from the prop
  console.log(data);
  const { images } = data;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <section>
        {images.map((category, index) => (
          <div key={index} style={{ marginBottom: "40px" }}>
            {/* Category Header */}
            <div
              id={" " + category.query}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <Styled.SearchHistory key={index}>
                <a style={{ textAlign: `left`, color: `#fff` }}>
                  {category.query}
                </a>
                <IoIosArrowForward width={40} height={40} color="white" />
              </Styled.SearchHistory>
            </div>

            {/* Content Layout */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "20px",
              }}
            >
              {Object.keys(category.images).map((item, idx) => (
                <div key={idx} style={{ textAlign: "center" }}>
                  <Styled.DeatiledCard>
                    <a
                      href={category.images[item].content_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", cursor: "pointer" }}
                    >
                      {/* Image */}
                      <LazyLoadImage
                        src={category.images[item].image}
                        alt={item}
                        effect="blur"
                        wrapperProps={{ style: { transitionDelay: "1s" } }}
                        style={{
                          objectFit: "contain",
                          width: "100%",
                          height: "auto",
                          marginBottom: "10px",
                        }}
                      />
                      {/* Item Name */}
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#333",
                          marginTop: "5px",
                          display: "block",
                        }}
                      >
                        {item}
                      </span>
                    </a>
                  </Styled.DeatiledCard>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ImageSearchResult;
