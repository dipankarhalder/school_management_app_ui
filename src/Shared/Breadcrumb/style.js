import styled from "styled-components";
import { Link } from "react-router-dom";
import { textColor } from "../../styles/mixins";

export const BreadcrumbNav = styled.nav`
  font-size: 11px;
  margin: 2px 0 0;
`;

export const BreadcrumbList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;

  & > span {
    width: 15px;
    height: 15px;
    margin: 0px 8px;
    ${textColor("gray")};

    & > svg {
      width: 15px;
      height: 15px;
    }
  }
`;

export const BreadcrumbLink = styled(Link)`
  ${textColor("blue")};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export const BreadcrumbText = styled.p`
  ${textColor("gray")};
  font-weight: 500;
`;
