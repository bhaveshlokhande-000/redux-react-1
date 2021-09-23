import React from "react";
import logo from "../images/logo.jpg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="row">
      <nav className="navbar-dark bg-dark d-flex flex-row flex-wrap ">
        <img
          style={{
            height: "40px",
            width: "80px",
            margin: "10px 30px 10px 70px",
          }}
          src={logo}
          alt=""
        />
        <Link to="/" style={{ textDecoration: "none" }}>
          <h5 className="text-muted p-3">Tutorial</h5>
        </Link>
        <Link to="/add" style={{ textDecoration: "none" }}>
          <h5 className="text-muted  p-3">Add</h5>
        </Link>
      </nav>
    </div>
  );
}

export default Header;
