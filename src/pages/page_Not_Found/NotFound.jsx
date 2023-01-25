import React from "react";
import { Link } from "react-router-dom";

//importing the css files
import "./notFound.css";

const NotFound = () => {
  return (
    <div className="nf-not-found-container">
      <h1 className="nf-error">404</h1>
      <h3 className="nf-message">Oops!This Page Could Not Be Found</h3>
      <p className="nf-text">
        sorry but the page you are looking for does not exist, have been removed
        name changed or temporarily unavailable.
      </p>
      <button className="l-btn nf-btn">
        <Link className="link" to={"/"}>go to homepage</Link>
      </button>
    </div>
  );
};

export default NotFound;
