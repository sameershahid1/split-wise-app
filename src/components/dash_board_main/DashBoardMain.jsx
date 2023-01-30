import React,{useEffect} from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DashBoardMain = () => {
const navigate=useNavigate();
useEffect(()=>{
  navigate("/dash-board/add-expense");
},[]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default DashBoardMain;
