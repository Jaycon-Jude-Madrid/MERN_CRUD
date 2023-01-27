import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { WorksoutContextProvider } from "./context/workoutContext";
import { AuthContextProvider } from "./context/AuthContext";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
  <AuthContextProvider>
    <WorksoutContextProvider>
      <App />
    </WorksoutContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
