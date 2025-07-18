import styled from "styled-components";
import { textColor } from "../../../styles/mixins";

export const AppSignin = styled.div`
  display: flex;
  width: 48%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const AppInsideSignin = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;

  span {
    width: 180px;
    height: 40px;
    margin-bottom: 60px;

    svg {
      width: 100%;
      height: auto;
    }
  }
`;

export const AppHeadingSignin = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  h1 {
    font-size: 18px;
    text-transform: uppercase;
    margin-bottom: 3px;
  }

  p {
    font-size: 14px;
    ${textColor("bodytext")};
  }
`;

export const AppFormSignin = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const AppFromField = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const AppCheckField = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  a {
    font-size: 14px;
    font-weight: 600;
    text-decoration: underline;
    ${textColor("blue")};
  }
`;

export const AppFormLabel = styled.label`
  font-size: 15px;
  ${textColor("bodytext")};
`;

export const AppErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 4px;
  display: block;
  ${textColor("error")};
`;

export const AppBtnField = styled.div`
  margin: 26px 0 40px;
`;

export const AppLinkCover = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;

  p {
    font-size: 14px;
    font-weight: 500;
  }

  a {
    font-size: 14px;
    font-weight: 600;
    text-decoration: underline;
    ${textColor("blue")};
  }
`;
