import styled from "styled-components";
import { textColor } from "../../../styles/mixins";

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

export const AppErrorMessage = styled.span`
  font-size: 12px;
  font-weight: 500;
  margin-top: 0px;
  display: block;
  ${textColor("error")};
`;
