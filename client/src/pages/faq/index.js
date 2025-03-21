import React, { useState } from "react";
import { faq_data } from "./data";
import * as Styled from "./faq.styles";
import { FAQCollapse } from "../../components/FAQCollapse";
import faqImg from "../../assets/faq/main.png";
import { Helmet } from "react-helmet";

const FAQs = () => {
  const [collapse, setCollapse] = useState(0);
  return (
    <Styled.FAQSectionWrapper>
      <Helmet>
        <title>Quick Answers About AI Image Finder - Galambo FAQ</title>
        <meta
          name="title"
          content="Quick Answers About AI Image Finder - Galambo FAQ"
        />
        <meta
          name="description"
          content="Got questions about AI Image Finder? We’ve got answers! Read our FAQ section to learn everything you need to know about Galambo."
        />

        <link rel="canonical" href="https://www.galambo.com/faq" />
      </Helmet>
      <img itemProp="image" src={faqImg} alt="faq img" />
      <Styled.FAQContainer>
        <div>
          {faq_data.map(
            (row, index) =>
              index < 10 && (
                <FAQCollapse
                  key={index}
                  {...row}
                  onClick={() => setCollapse(index)}
                  open={collapse === index}
                />
              )
          )}
        </div>
        <div>
          {faq_data.map(
            (row, index) =>
              index > 9 && (
                <FAQCollapse
                  key={index}
                  {...row}
                  onClick={() => setCollapse(index)}
                  open={collapse === index}
                />
              )
          )}
        </div>
      </Styled.FAQContainer>
    </Styled.FAQSectionWrapper>
  );
};
export default FAQs;
