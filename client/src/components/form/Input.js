import React from "react";
import * as Styled from "./style";
import eye from "../../assets/eye.png";
import { useState } from "react";
const Input = ({
  label,
  name,
  type,
  placeholder,
  required = false,
  value,
  onChange,
  className,
  onBlur,
}) => {
  const [typeText, setType] = useState(false);
  return (
    <Styled.InputForm>
      <label>{label}</label>
      <div className={className}>
        <input
          placeholder={placeholder}
          name={name}
          type={typeText ? "text" : type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {type === "password" && (
          <img
            itemProp="image"
            src={eye}
            alt="eye"
            onClick={() => setType(!typeText)}
          />
        )}
      </div>
    </Styled.InputForm>
  );
};

export default Input;
