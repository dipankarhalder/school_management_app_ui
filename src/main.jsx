import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Root } from "./Root";

const core = document.getElementById("root");
createRoot(core).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
