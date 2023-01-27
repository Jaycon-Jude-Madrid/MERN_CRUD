import { Route, Routes,Navigate } from "react-router";
import Navbar from "./Components/Navbar";
import {  useAuthContext } from "./hooks/useAuthContext";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {

  
const {stateAuth} =  useAuthContext();
  return (
    <div className="App">
      <Navbar />
      <div className="pages">
        <Routes>
          <Route path="/" element={stateAuth.user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={!stateAuth.user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!stateAuth.user ? <Signup /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
