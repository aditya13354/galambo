import React from "react";
import * as Styled from "./style";
import { Helmet } from "react-helmet";
import { blog_concept_data } from "./data";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { blog_data } from "../blog/data";
import previous from "../../assets/Hide.png";

const BlogDetail = () => {
  const { id } = useParams();
  const titles = Object.keys(blog_concept_data);
  const filteredTitles = titles.filter((title) => title !== id);
  // Randomly choose 2 values from the filtered array
  const chosenTitles = filteredTitles
    .sort(() => 0.5 - Math.random()) // Shuffle the array
    .slice(0, 2); // Take the first 2 elements
  return (
    <Styled.TermContainer>
      <Helmet>
        <title>{blog_concept_data[id].title}</title>
        <meta name="title" content={blog_concept_data[id].title} />
        <meta name="description" content={blog_concept_data[id].description} />

        <link rel="canonical" href={`https://www.galambo.com/blog/${id}`} />
      </Helmet>
      <Styled.TermWrapper>
        <Styled.BlogDetailWrapper>
          <div>
            <Link to="/blog">
              <Styled.PreviousBtn style={{ margin: "0" }}>
                <img src={previous} alt="back btn" width={11} />
                Back to blog
              </Styled.PreviousBtn>
            </Link>
            {blog_concept_data[id].header}
          </div>
          <Styled.ImageView
            link={blog_concept_data[id].detail1}
            aria-label={blog_concept_data[id].detail1_alt}
            style={{
              maxHeight: "511px",
              minHeight: "411px",
              margin: "25px 0 0 0",
            }}
          />
        </Styled.BlogDetailWrapper>
        <Styled.BlogDetailWrapper style={{ marginTop: "153px" }}>
          <Styled.ImageView
            link={blog_concept_data[id].detail2}
            aria-label={blog_concept_data[id].detail2_alt}
            // style={{ maxHeight: "700px" }}
          />
          {blog_concept_data[id].content1}
        </Styled.BlogDetailWrapper>
        <Styled.BlogDetailWrapper style={{ marginTop: "153px" }}>
          {blog_concept_data[id].content2}
          <Styled.ImageView
            link={blog_concept_data[id].detail3}
            aria-label={blog_concept_data[id].detail3_alt}
            // style={{ maxHeight: "800px" }}
          />
        </Styled.BlogDetailWrapper>
        {!isEmpty(blog_concept_data[id].content3) && (
          <Styled.BlogDetailWrapper style={{ marginTop: "153px" }}>
            <Styled.ImageView
              link={blog_concept_data[id].detail4}
              aria-label={blog_concept_data[id].detail4_alt}
              // style={{ maxHeight: "800px" }}
            />
            {blog_concept_data[id].content3}
          </Styled.BlogDetailWrapper>
        )}

        {!isEmpty(blog_concept_data[id].content4) && (
          <Styled.BlogDetailWrapper style={{ marginTop: "153px" }}>
            {blog_concept_data[id].content4}
            <Styled.ImageView
              link={blog_concept_data[id].detail5}
              aria-label={blog_concept_data[id].detail5_alt}
              style={{ maxHeight: "800px" }}
            />
          </Styled.BlogDetailWrapper>
        )}
        <Link to="/blog">
          <Styled.PreviousBtn>
            <img src={previous} alt="back btn" />
            Back to blog
          </Styled.PreviousBtn>
        </Link>
        <span>Articles that may interest you</span>
        {chosenTitles.map((item, key) =>
          blog_data.map(
            (keyword) =>
              keyword.link.indexOf(item) > -1 && (
                <Styled.BlogContent>
                  <Styled.BlogCardWrapper key={key} index={key}>
                    <Styled.BlogPomp>
                      <Styled.BlogCard index={key}>
                        <h1>{keyword.title}</h1>
                        <h2>{keyword.content}</h2>
                        <a href={keyword.link} target="_blank" rel="noreferrer">
                          <button>Read More</button>
                        </a>
                      </Styled.BlogCard>
                    </Styled.BlogPomp>
                    <LazyLoadImage
                      src={blog_concept_data[item].detail1}
                      alt={blog_concept_data[item].detail1_alt}
                      effect="blur"
                      wrapperProps={{ style: { transitionDelay: "1s" } }}
                    />
                  </Styled.BlogCardWrapper>
                </Styled.BlogContent>
              )
          )
        )}
      </Styled.TermWrapper>
    </Styled.TermContainer>
  );
};
export default BlogDetail;
