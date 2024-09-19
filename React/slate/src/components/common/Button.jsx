import React from "react";
import styled from "styled-components";

const ButtonSpan = styled.button`
  color: ${(props) => (props.$active ? "#000" : "#ccc")};
  background-color: white;
  border: none;
  cursor: pointer;
`;

const Button = (props) => {
  const { children, format, active, ...rest } = props;
  return (
    <ButtonSpan $active={active} title={format} {...rest}>
      {children}
    </ButtonSpan>
  );
};

export default Button;
