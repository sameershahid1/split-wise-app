import React from "react";
import LoginForm from "../../components/login-form/LoginForm";
import "./login_style.css";

const Login = () => {

  return (
    <div className="l-background">
      <LoginForm classname={"l-form-position"} />
    </div>
  );
};

export default Login;
