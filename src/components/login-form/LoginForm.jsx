import React, { useRef, useState } from "react";
import "./login_form_style.css";
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import loadingImg from "../../Assets/loading.png";

const LoginForm = ({ classname }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const submit = () => {
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((current) => {
        setLoad(false);
        navigate("/dash-board");
      })
      .catch((error) => {
        console.log(error);
      });

      setLoad(true);
  };

  return (
    <form className={`login-form flex-column ${classname}`}>
      <h1 className="l-title">Log in</h1>
      <div className="l-container">
        <label className="l-label" htmlFor="email">
          Email address
        </label>
        <input
          ref={emailRef}
          className="l-input"
          type="email"
          id="email"
          name="email"
        />
      </div>
      <div className="l-container">
        <label className="l-label" htmlFor="password">
          Password
        </label>
        <input
          className="l-input"
          type="password"
          id="password"
          name="password"
          ref={passwordRef}
        />
      </div>
      <div className="l-btn-container">
        <button onClick={submit} className="l-btn" type="button">
          Log in
        </button>
        <button className="l-btn l-">Reset Password</button>
      </div>
      {load&&<img className="loading" src={loadingImg} alt="Loading" />}
    </form>
  );
};

export default LoginForm;
