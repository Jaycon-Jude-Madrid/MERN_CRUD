import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
const Navbar = () => {
  const { stateAuth } = useAuthContext();
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h2>Workout buddy</h2>
        </Link>
        <nav>
          {stateAuth.user && (
            <div>
              <span>{stateAuth.user?.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
{!stateAuth.user && 
  <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>}
          
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
