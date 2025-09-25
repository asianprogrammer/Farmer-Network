import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // ✅ Import Toaster
import App from "./App.jsx";

import "./assets/styles/reset.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="top-right" reverseOrder={false} /> {/* ✅ Toaster here */}
    </BrowserRouter>
  </StrictMode>
);