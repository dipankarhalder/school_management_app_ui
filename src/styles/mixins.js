import { css } from "styled-components";

export const fontFamily = css`
  font-family: ${({ theme }) => theme.font.primary};
`;

export const textColor = (key) => css`
  color: ${({ theme }) => theme.colors[key]};
`;

export const backgroundColor = (key) => css`
  background-color: ${({ theme }) => theme.colors[key]};
`;

export const borderStyleColor = (size, key) => css`
  border: ${size}px solid ${({ theme }) => theme.colors[key]};
`;
