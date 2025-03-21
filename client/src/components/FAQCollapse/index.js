import React from "react";
import * as Styled from "./collapse.styles";
import dropdown from "../../assets/faq/dropdown.png";
import black from "../../assets/faq/black.png";
export const FAQCollapse = ({ description, title, onClick, open }) => {
  return (
    <Styled.CollapseWrapper>
      <Styled.CollapseHeader open={open} onClick={onClick}>
        <h3>{title}</h3>
        {open ? (
          <img itemProp="image" src={dropdown} width={10} alt="drop_down_img" />
        ) : (
          <img
            itemProp="image"
            src={black}
            width={6}
            height={10}
            alt="drop_down_img"
          />
        )}
      </Styled.CollapseHeader>
      <Styled.CollapseContent open={open}>{description}</Styled.CollapseContent>
    </Styled.CollapseWrapper>
  );
};
