import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h2>Workout buddy</h2>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
