import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { router } from "./Route";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/GlobalStyle";
import { ComposeProviders } from "./Context/ComposeProviders";
import { ToastProvider } from "./Shared/Toast/context/ToastProvider";

const providers = [
  ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>,
  ToastProvider,
];

export const Root = () => (
  <ComposeProviders providers={providers}>
    <GlobalStyle />
    <RouterProvider router={router} />
  </ComposeProviders>
);
