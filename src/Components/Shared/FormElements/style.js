import styled from "styled-components";
import {
  textColor,
  fontFamily,
  backgroundColor,
  borderStyleColor,
} from "../../../styles/mixins";

export const AppFromField = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;

  label {
    font-size: 15px;
    ${textColor("bodytext")};
  }
`;

export const AppPhoneCover = styled.div`
  display: flex;
  gap: 10px;

  & > select {
    ${fontFamily};
    width: 30%;
    height: 44px;
    padding: 0 10px;
    border-radius: 6px;
    font-weight: 500;
    font-size: 14px;
    ${borderStyleColor(1, "tableborder")}

    &.disabled {
      ${backgroundColor("gray")};
      cursor: not-allowed;
    }
  }

  & > input {
    ${fontFamily};
    width: 70%;
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
  }
`;

export const AppErrorMessage = styled.span`
  font-size: 12px;
  font-weight: 500;
  margin-top: 0px;
  display: block;
  ${textColor("error")};
`;
