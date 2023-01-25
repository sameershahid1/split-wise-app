import React from "react";
import HeaderDashBoard from "../../components/header/HeaderDashBoard";
import DashBoardMain from "../../components/dash_board_main/DashBoardMain";
import SideBar from "../../components/side_bar/SideBar";
import './dash_board_style.css';

const DaskBoard = () => {
  return (
    <div>
      <HeaderDashBoard />
      <div className="d-container flex">
        <SideBar />
        <DashBoardMain />
      </div>
    </div>
  );
};

export default DaskBoard;
