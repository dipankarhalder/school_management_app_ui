import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  backgroundColor,
  textColor,
  borderStyleColor,
  fontFamily,
} from "../../../styles/mixins";

export const AppSideBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 230px;
  height: 100vh;
  padding: 16px 20px;
  overflow-y: auto;
  position: sticky;
  top: 0;
  ${backgroundColor("sidebar")};
  ${borderStyleColor(1, "tableborder")};
`;

export const AppSidebarInside = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > span {
    display: flex;
    width: 120px;
    margin-bottom: 30px;

    & > svg {
      width: 100%;
      height: 36px;
    }
  }
`;

export const AppSidebarLinkCover = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SidebarItem = styled.div`
  width: 100%;
  ${({ $expanded }) =>
    $expanded &&
    css`
      ${backgroundColor("backgroundHover")};
    `}
`;

export const SidebarTitle = styled.h4`
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 4px;
  text-transform: uppercase;
  ${textColor("blue")};
  ${fontFamily};
`;

export const SidebarList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-bottom: 24px;
`;

export const SidebarListItem = styled.li`
  margin: 0;
  ${({ $active }) =>
    $active &&
    css`
      ${backgroundColor("primaryLight")};
      border-radius: 4px;

      a {
        ${textColor("primary")};
        font-weight: 500;
      }
    `}
`;

export const SidebarLinkStyled = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  text-decoration: none;
  border-radius: 4px;
  ${textColor("text")};
  ${fontFamily};

  & > span {
    width: 17px;
    height: 17px;
    ${textColor("dark")};

    & > svg {
      width: 17px;
      height: 17px;
    }
  }

  p {
    margin: 0;
    font-size: 14px;
    line-height: 18px;
    font-weight: 600;
    ${textColor("dark")};
    ${fontFamily};
  }

  &:hover {
    ${backgroundColor("backgroundHover")};
  }
`;
