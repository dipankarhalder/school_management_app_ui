import styled from "styled-components";
import { fontFamily } from "../../styles/mixins";

export const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`;

export const Chip = styled.div`
  background-color: #e0e0e0;
  padding: 6px 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  font-size: 14px;

  span {
    margin-left: 8px;
    cursor: pointer;
    font-weight: bold;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  min-height: 42px;
  gap: 8px;
`;

export const StyledInput = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  flex: 1;
  ${fontFamily};
  min-width: 100px;
`;
