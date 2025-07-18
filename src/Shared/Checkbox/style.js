import styled from "styled-components";
import { textColor } from "../../styles/mixins";

export const StyledCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledCheckbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const StyledLabel = styled.label`
  font-size: 14px;
  cursor: pointer;
  user-select: none;

  & > a {
    font-weight: 600;
    ${textColor("blue")};
    text-decoration: underline;
  }
`;
