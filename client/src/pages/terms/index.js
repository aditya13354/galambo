import React from "react";
import * as Styled from "./style";

import { term_data } from "./data";
import { Helmet } from "react-helmet";
const Terms = () => {
  return (
    <Styled.TermContainer>
      <Helmet>
        <title>Terms & Conditions - Galambo</title>
        <meta name="title" content="Terms & Conditions - Galambo" />
        <meta
          name="description"
          content="Review Galambo’s terms and conditions. Learn about the policies that guide our services to ensure transparency and trust."
        />

        <link rel="canonical" href="https://www.galambo.com/term" />
      </Helmet>
      <Styled.TermWrapper>
        <span itemProp="headline">Terms & Conditions</span>
        {term_data.map((item, key) => (
          <Styled.TermProvider key={key}>
            <h3>{item.title}</h3>
            <span>{item.content}</span>
          </Styled.TermProvider>
        ))}
      </Styled.TermWrapper>
    </Styled.TermContainer>
  );
};
export default Terms;
