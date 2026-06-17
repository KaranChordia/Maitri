import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx?t=20260617-character-lab-redesign";
import "./styles.css?t=20260617-character-lab-redesign";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
