import React from "react";
import img1 from "../../assets/about/1.png";
import img2 from "../../assets/about/2.png";
import img3 from "../../assets/about/3.png";
import img4 from "../../assets/about/4.png";

import logo from "../../assets/about/logo.png";
import icon from "../../assets/about/icon.png";
import hi from "../../assets/about/hi.png";
import * as Styled from "./style";
import { Helmet } from "react-helmet";
export default function About() {
  return (
    <Styled.StyledAboutWrapper>
      <Helmet>
        <title>About Galambo - Trusted AI Image Search Tool</title>
        <meta
          name="title"
          content="About Galambo - Trusted AI Image Search Tool"
        />
        <meta
          name="description"
          content="Learn about Galambo’s mission and vision and how it is transforming image search with innovation and commitment to excellence."
        />

        <link rel="canonical" href="https://www.galambo.com/about" />
      </Helmet>
      <Styled.GlobalStyle />
      <Styled.StyledAbout>
        <div>
          <img itemProp="image" src={logo} alt="logo" width={237} />
          <img itemProp="image" src={hi} alt="logo" width={68} height={49} />
        </div>
      </Styled.StyledAbout>
      <Styled.AboutTxt>
        <div>
          <span>
            I’m <span>Galambo</span>, your friendly AI-powered image-based
            search engine. Just give me an image query, and I’ll uncover the
            details, helping you discover locations and contexts linked to those
            images. Whether you’re curious about places, services, or just the
            story behind a photo, I've got you covered. Behind the scenes,
            there’s an enthusiastic team driving me. We may be small, but we
            dream big and believe strongly in our ability to enhance your search
            experience. As we grow and evolve, we're excited to bring even more
            insights and convenience to your fingertips. Let’s explore the
            visual world together— there’s so much to see and learn! Galambo
          </span>
        </div>
        <div>
          <img
            itemProp="image"
            src={icon}
            alt="question mark"
            width={17}
            height={18}
          />
        </div>
      </Styled.AboutTxt>
      <Styled.StyledContent>
        <p>Key features</p>
        <Styled.KeyFeatures>
          <Styled.StyledDescription className="item1">
            <div>
              <img
                itemProp="image"
                src={img1}
                alt="item1"
                width={11}
                height={15}
              />
            </div>
            <p>Image Recognition</p>
          </Styled.StyledDescription>
          <Styled.StyledDescription className="item2">
            <div>
              <img
                itemProp="image"
                src={img2}
                alt="item2"
                width={10}
                height={15}
              />
            </div>
            <p>Interactive Search</p>
          </Styled.StyledDescription>
          <Styled.StyledDescription className="item3">
            <div>
              <img
                itemProp="image"
                src={img3}
                alt="item3"
                width={11}
                height={15}
              />
            </div>
            <p>Integration with Other Services</p>
          </Styled.StyledDescription>

          <Styled.StyledDescription className="item4">
            <div>
              <img
                itemProp="image"
                src={img4}
                alt="item4"
                width={10}
                height={15}
              />
            </div>
            <p>Privacy and Security Features</p>
          </Styled.StyledDescription>
        </Styled.KeyFeatures>
      </Styled.StyledContent>
      <Styled.WhyContent>
        <h4>Why Galambo is Better</h4>
        <p>
          <span>Galambo</span> offers a faster, more accurate reverse image
          search experience, helping users quickly find the origin and context
          of any image. Our AI technology ensures accurate results while
          protecting your privacy. Our platform works smoothly with other tools,
          making your experience faster and easier. <span>Galambo</span> stands
          out for its user-friendly design and focus on providing trustworthy
          and relevant search results. We prioritize speed, accuracy, and
          seamless integration for an intuitive search experience.
        </p>
      </Styled.WhyContent>
    </Styled.StyledAboutWrapper>
  );
}
