import React from "react";
import "./header_style.css";
import { Link } from "react-router-dom";
import Logo from './../logo/Logo';

const Header = () => {
  return (
    <header className="header-container">
      <Logo/>
      <button className="h-btn" type="button">
        <Link className="link" to="/">Log in</Link>
      </button>
    </header>
  );
};

export default Header;
