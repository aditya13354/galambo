import React from "react";
import * as Styled from "./style";
import { format } from "date-fns";
import { term_data } from "./data";
import { Helmet } from "react-helmet";
const Privacy = () => {
  return (
    <Styled.TermContainer>
      <Helmet>
        <title>Privacy Page | Galambo</title>
        <meta name="description" content="Privacy page of galambo" />

        <link rel="canonical" href="https://www.galambo.com/privacy" />
      </Helmet>
      <Styled.TermWrapper>
        <span>PRIVACY POLICY</span>
        <Styled.TermProvider>
          <div style={{border:`${1}px solid black`,padding:`${15}px ${20}px`,borderRadius:`${1}rem`}}>
          <div style={{fontWeight:900}}>Last updated: {format(new Date(Date.now()), "MM/dd/yyyy")}</div>
          <p>
            This Privacy Policy explains how we, AI Tech Solutions Ltd ("we,"
            "us", "our"), collect, use, disclose, safeguard, and otherwise
            process personal information when you visit and interact with our
            website Rbetrage.com, as well as when you purchase and use our
            online subscription services ("Services").
          </p>
          <div>
            This Privacy Policy also outlines our data practices when we
            communicate with you by email, telephone, or other means.
          </div>
          <div>
            When you provide us with your personal information, you consent to
            its use for the purposes outlined in this Privacy Policy.
          </div>
          <div>
            We may update this Privacy Policy periodically, and any
            modifications will be posted at https://www.rbetrage.com/privacy,
            with the effective date changed accordingly. We encourage you to
            check this page periodically for any changes.
          </div>
          </div>
        </Styled.TermProvider>
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
export default Privacy;
