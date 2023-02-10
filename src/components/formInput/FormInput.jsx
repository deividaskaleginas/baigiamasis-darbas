import { useState } from "react";
import styled from "styled-components";

export const FormInput = (props) => {
  const { label, errorMessage, onChange, id, ...inputProps } = props;
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <InputContainer>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span>{errorMessage}</span>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;

  input {
    max-width: 100%;
    border: 0.0938rem solid gray;
    border-radius: 0.625rem;
    color: black;
    font-size: 0.6875rem;
    padding: 1.1875rem 0 1.1875rem 2rem;
    line-height: 1.0313rem;
  }

  span {
    display: none;
    font-size: 12px;
    padding-bottom: 1.375rem;
    color: #ff9c00;
  }

  input:invalid[focused="true"] {
    border: 1px solid red;
  }
  input:invalid[focused="true"] ~ span {
    display: block;
  }
`;
