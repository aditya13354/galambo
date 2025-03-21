import React from "react";
import * as Styled from "./style";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function NotFound() {
  return (
    <Styled.NotFoundWrapper>
      <Helmet>
        <title>NotFound Page | Galambo</title>
        <meta name="description" content="NotFound page of galambo" />
        <link rel="canonical" href="https://www.galambo.com/not-found" />
      </Helmet>
      <h1 itemProp="headline">404</h1>
      <h2>PAGE NOT FOUND</h2>
      <h3>
        The page you are looking for was moved, removed renamed or might never
        existed
      </h3>
      <Link rel="canonical" to="/">
        <div>
          <p>Go Home</p>
        </div>
      </Link>
    </Styled.NotFoundWrapper>
  );
}
