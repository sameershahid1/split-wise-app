import React, { useRef, useState,useEffect } from "react";
import "./login_form_style.css";
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import loadingImg from "../../Assets/loading.png";
import Message from "../message/Message";
import ResetFrom from "../reset_password/ResetFrom";

const LoginForm = ({ classname }) => {
  //useRefs
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  //useStates
  const [load, setLoad] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [valid, setValid] = useState({
    isValid: true,
    message: "",
    type: "",
  });

useEffect(()=>
{
  const isLoged=window.sessionStorage.getItem('isLoged');
  if(isLoged==="YES")
  {
    navigate("/dash-board");
  }
},[]);

  //Submit functions
  const submitHandeler = () => {
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((current) => {
        setTimeout(() => {
          setLoad(false);
          window.sessionStorage.setItem("isLoged","YES");
          navigate("/dash-board");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setLoad(false);
        setValid({
          isValid: false,
          message: "Invalid email or password",
          type: "Error",
        });
      });

    setLoad(true);
  };

  const resetHandler = () => {
    setIsReset(true);
  };

  return (
    <>
      {!valid.isValid || isReset ? <div className="background"></div> : null}
      {isReset ? <ResetFrom setIsReset={setIsReset} setValid={setValid} /> : null}
      {!valid.isValid ? <Message valid={valid} setValid={setValid} /> : null}
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
          <button onClick={submitHandeler} className="l-btn" type="button">
            Log in
          </button>
          <button onClick={resetHandler} className="l-btn l-" type="button">
            Reset Password
          </button>
        </div>
        {load && <img className="loading" src={loadingImg} alt="Loading" />}
      </form>
    </>
  );
};

export default LoginForm;
