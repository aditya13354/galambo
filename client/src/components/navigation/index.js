import React from "react";
import * as Styled from "./navigation.styles";
import { Link } from "react-router-dom";
import { contact_data } from "./data";

export const Navigation = () => {
  return (
    <Styled.NavigationWrapper>
      <Styled.NavigationContainer>
        <Styled.CopyrightWrapper>
          <Styled.FooterContent>
            <a href="https://www.aitechsolutionsltd.com" target="_blank">
              <span>
                © Ai Tech Solutions Limited {new Date().getFullYear()}. All
                Rights Reserved.
              </span>
            </a>
          </Styled.FooterContent>
          <Styled.FooterItems>
            <div>
              <Link rel="canonical" to="/about">
                ABOUT US
              </Link>
              <Link rel="canonical" to="/how">
                HOW TO USE
              </Link>
              <Link rel="canonical" to="/blog">
                BLOG
              </Link>
            </div>
            <div>
              <Link rel="canonical" to="/faq">
                FAQ
              </Link>
              <Link rel="canonical" to="/contact">
                CONTACT INFO
              </Link>
              <Link rel="canonical" to="/term">
                TERMS & CONDITIONS
              </Link>
            </div>
          </Styled.FooterItems>
          <Styled.SocialsNavWrapper>
            {contact_data.map((item, key) => (
              <a rel="noreferrer" href={item.link} key={key} target="_blank">
                <img itemProp="image" src={item.src} alt="find img" />
              </a>
            ))}
          </Styled.SocialsNavWrapper>
        </Styled.CopyrightWrapper>
      </Styled.NavigationContainer>
    </Styled.NavigationWrapper>
  );
};
