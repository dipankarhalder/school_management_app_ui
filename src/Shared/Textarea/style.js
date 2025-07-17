import styled from "styled-components";
import {
  fontFamily,
  backgroundColor,
  borderStyleColor,
} from "../../styles/mixins";

export const StyledTextarea = styled.textarea`
  ${fontFamily};
  width: 100%;
  height: 100px;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 15px;
  resize: none;
  ${borderStyleColor(1, "tableborder")}

  &.disabled {
    ${backgroundColor("gray")};
    cursor: not-allowed;
  }
`;
