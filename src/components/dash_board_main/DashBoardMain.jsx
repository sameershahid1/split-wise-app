import React,{useEffect} from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DashBoardMain = () => {
const navigate=useNavigate();
useEffect(()=>{
  const isLoged=window.sessionStorage.getItem("isLoged");
  if(isLoged==="YES")
  {
    navigate("/dash-board/add-expense");
  }
},[]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default DashBoardMain;
