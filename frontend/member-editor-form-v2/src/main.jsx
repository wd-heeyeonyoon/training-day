import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import MemberEditorForm from "./MemberEditorForm";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MemberEditorForm />
  </StrictMode>,
);
