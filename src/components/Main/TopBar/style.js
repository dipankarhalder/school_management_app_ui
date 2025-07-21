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
  background: #f6f8fa;
  border: 1px solid #d0d7de;
  box-shadow: inset 0px 1px 0px rgba(208, 215, 222, 0.2);
  border-radius: 6px;
  padding-left: 4px;

  & > span {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;

    & > svg {
      width: 17px;
      height: 17px;
    }
  }
`;

export const AppDropDownItem = styled.div`
  position: relative;
  display: flex;

  & > select {
    height: 32px;
    font-size: 13px;
    font-weight: 600;
    width: auto;
    height: 32px;
    padding: 0 40px 0 4px;
    background: transparent;
    border: 0px solid transparent;
    appearance: none;
    -webkit-appearance: none;
  }

  & > span {
    top: 0;
    right: 0;
    width: 32px;
    height: 32px;
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;

    & > svg {
      width: 17px;
      height: 17px;
    }
  }
`;

export const AppLoginTime = styled.div`
  display: flex;
  margin-left: 30px;

  & > span {
    height: 32px;
    line-height: 34px;
    font-size: 12px;
    font-weight: 600;
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
