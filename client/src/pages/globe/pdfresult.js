import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import * as Styled from "./style";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PDFComponent = ({ data }) => {
  const { images } = data || {};
  console.log(data);
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <section>
        {images.map((category, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
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

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "20px",
              }}
            >
              {Object.keys(category.images).map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    textAlign: "center",
                  }}
                >
                  <Styled.DeatiledCard>
                    <a
                      href={category.images[item].content_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: `none`, cursor: `pointer` }}
                    >
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

export default PDFComponent;
