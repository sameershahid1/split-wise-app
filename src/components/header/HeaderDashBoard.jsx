import React from "react";
import Logo from "../logo/Logo";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import "./header_style.css";

const HeaderDashBoard = () => {
  const navigate = useNavigate();
  return (
    <div className="header-container header-background">
      <Logo />
      <button
        onClick={() => {
          signOut(auth)
            .then((res) => {
              navigate("/");
            })
            .catch((error) => {
              console.log(error);
            });
        }}
        className="h-btn d-btn link"
      >
        Log-out
      </button>
    </div>
  );
};

export default HeaderDashBoard;
