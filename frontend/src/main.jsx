import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary"; // ✅ Import ErrorBoundary
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
