import styled, { keyframes } from "styled-components";
import {
  fontFamily,
  backgroundColor,
  borderStyleColor,
  textColor,
} from "../../styles/mixins";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const StyledButton = styled.button`
  height: 42px;
  width: auto;
  padding: 0 30px;
  ${fontFamily};
  ${backgroundColor("btnbg")};
  ${textColor("white")};
  font-weight: 600;
  font-size: 15px;
  border-radius: 6px;
  text-align: center;
  ${borderStyleColor(1, "btnborder")}
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    ${backgroundColor("btnhover")};
    transition: 0.5s;
  }

  & > span {
    width: 20px;
    height: 20px;

    & > svg {
      width: 20px;
      height: 20px;
    }
  }

  &.active {
    ${backgroundColor("blue")};
    ${textColor("white")};
  }

  &.loading {
    ${backgroundColor("gray")};
    cursor: not-allowed;

    & > span > svg {
      animation: ${spin} 2s linear infinite;
    }
  }

  &.disabled {
    ${backgroundColor("gray")};
    cursor: not-allowed;
  }
`;
