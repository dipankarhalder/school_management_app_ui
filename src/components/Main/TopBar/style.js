import styled from "styled-components";
import { borderStyleColor, backgroundColor } from "../../../styles/mixins";

export const AppMainTopCover = styled.div`
  display: flex;
  width: calc(100% - 250px);
  position: fixed;
  top: 0px;
  padding: 10px 24px;
  border-bottom: 1px solid #d2dbe5;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
  ${backgroundColor("white")};
`;

export const AppMainLeftArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const AppMainItemSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AppLocationDropDown = styled.div`
  display: flex;

  & > select {
    height: 34px;
    font-size: 13px;
    fonty-weight: 600;
    margin-left: 40px;
  }
`;

export const AppMainRightArea = styled.div`
  width: auto;

  & > ul {
    display: flex;
    gap: 10px;

    & > li {
      width: 32px;
      height: 32px;

      & > span {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 6px;
        ${borderStyleColor(1, "tableborder")}

        & > svg {
          width: 17px;
          height: 17px;
        }
      }

      &:last-child {
        border-radius: 50%;
        ${borderStyleColor(1, "tableborder")}
      }
    }
  }
`;
