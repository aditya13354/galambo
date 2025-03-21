import React from "react";
import * as Styled from "./style";
import { Helmet } from "react-helmet";
import { how_data } from "./data";

const How = () => {
  return (
    <Styled.HowWrapper>
      <Helmet>
        <title>How Galambo Works - Guide with Simple Steps</title>
        <meta
          name="title"
          content="How Galambo Works - Guide with Simple Steps"
        />
        <meta
          name="description"
          content="A guide for Galambo AI Image Search. Explore our easy how-to guide and get started with smart visual searches."
        />

        <link rel="canonical" href="https://www.galambo.com/how" />
      </Helmet>
      <Styled.HowContainer>
        <h1>how to use</h1>
        <Styled.HowItmes>
          {how_data.map((item, key) => (
            <Styled.HowItemWrapper key={key} index={key}>
              <img src={item.src} alt="how-to-use" />
              <Styled.HowItemContainer>
                <p style={{ fontWeight: "bold" }}>{item.title}</p>
                <Styled.HowItemContent>{item.content}</Styled.HowItemContent>
              </Styled.HowItemContainer>
            </Styled.HowItemWrapper>
          ))}
        </Styled.HowItmes>
      </Styled.HowContainer>
    </Styled.HowWrapper>
  );
};

export default How;
