import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { WorksoutContextProvider } from "./context/workoutContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <WorksoutContextProvider>
        <App />
      </WorksoutContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
