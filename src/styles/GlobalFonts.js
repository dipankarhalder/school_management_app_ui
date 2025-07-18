import { createGlobalStyle } from "styled-components";

export const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family: 'AvenirNext';
    src: url('/fonts/AvenirNext-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'AvenirNext';
    src: url('/fonts/AvenirNext-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'AvenirNext';
    src: url('/fonts/AvenirNext-DemiBold.woff') format('woff');
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: 'AvenirNext';
    src: url('/fonts/AvenirNext-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
  }
`;
