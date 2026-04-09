import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HeroVariants from "./HeroVariants.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroVariants />
  </StrictMode>
);
