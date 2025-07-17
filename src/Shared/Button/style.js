import styled, { keyframes } from "styled-components";
import { fontFamily, backgroundColor, textColor } from "../../styles/mixins";

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
  ${backgroundColor("blue")};
  ${textColor("white")};
  font-weight: 600;
  font-size: 15px;
  border-radius: 40px;
  border: 0px solid transparent;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    ${backgroundColor("hblue")};
    transition: 0.5s;
  }

  span {
    width: 20px;
    height: 20px;

    svg {
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

    span > svg {
      animation: ${spin} 2s linear infinite;
    }
  }

  &.disabled {
    ${backgroundColor("gray")};
    cursor: not-allowed;
  }
`;
