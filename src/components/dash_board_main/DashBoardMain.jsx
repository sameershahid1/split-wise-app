import React from "react";
import { Outlet } from "react-router-dom";

const DashBoardMain = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default DashBoardMain;
