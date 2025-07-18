import styled from "styled-components";
import {
  fontFamily,
  backgroundColor,
  borderStyleColor,
} from "../../styles/mixins";

export const StyledInput = styled.input`
  ${fontFamily};
  width: 100%;
  height: 44px;
  padding: 0 16px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 15px;
  ${borderStyleColor(1, "inputborder")}

  &.disabled {
    ${backgroundColor("gray")};
    cursor: not-allowed;
  }
`;
