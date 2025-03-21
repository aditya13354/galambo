import React from "react";
import * as Styled from "./style";
import { Helmet } from "react-helmet";
import { blog_data } from "./data";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
const Blog = () => {
  return (
    <Styled.TermContainer>
      <Helmet>
        <title>Blog Page | Galambo</title>
        <meta
          name="description"
          content=" I'm Galambo, your trusty AI-powered image-based search engine. Today, I'm thrilled to share some innovative ways you can make the most of my image search."
        />

        <link rel="canonical" href="https://www.galambo.com/blog" />
      </Helmet>
      <Styled.TermWrapper>
        <span>USEFUL READS</span>
        <Styled.BlogContent>
          {blog_data.map((item, key) => (
            <Styled.BlogCardWrapper key={key} index={key}>
              <Styled.BlogPomp>
                <Styled.BlogCard index={key}>
                  <h1>{item.title}</h1>
                  <h2>{item.content}</h2>
                  <Link to={item.link} target="_self" rel="noreferrer">
                    <button>Read More</button>
                  </Link>
                </Styled.BlogCard>
              </Styled.BlogPomp>
              <LazyLoadImage
                src={item.src}
                alt={item.content}
                effect="blur"
                wrapperProps={{ style: { transitionDelay: "1s" } }}
              />
            </Styled.BlogCardWrapper>
          ))}
        </Styled.BlogContent>
      </Styled.TermWrapper>
    </Styled.TermContainer>
  );
};
export default Blog;
