import React from "react";
import "./side_bar_style.css";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <ul className="side-bar-container flex-column">
        <li className="s-list">
          <Link className="s-link" to={"/dash-board/add-expense"}>
            Add Expence
          </Link>
        </li>
        <li className="s-list">
          <Link className="s-link" to={"/dash-board/all-expense"}>
            All Expenses
          </Link>
        </li>
      </ul>
    </>
  );
};

export default SideBar;
