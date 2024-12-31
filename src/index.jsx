import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import MainContainer from "./containers/MainContainer.jsx";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <MainContainer />
  </StrictMode>
);
