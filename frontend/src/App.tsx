import { useState } from "react";
import { Route, Routes } from "react-router";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
