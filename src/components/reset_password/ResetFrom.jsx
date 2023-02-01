import React, { useRef } from "react";
import closeImg from "../../Assets/close.png";
import { auth } from "../../firebase-config";
import { sendPasswordResetEmail } from "firebase/auth";

const ResetFrom = ({ setIsReset, setValid }) => {
  //refs
  const emailRef = useRef(null);

  //Cancel Handler
  const cancelHandler = () => {
    setIsReset(false);
  };

  //Send Handler
  const sendHandler = () => {
    if (emailRef.current.value.trim() !== "") {
      sendPasswordResetEmail(auth, emailRef.current.value)
        .then((res) => {
          setValid({
            isValid: false,
            message: "Email is send to your inbox",
            type: "Message",
          });
        })
        .catch((error) => {
          setValid({
            isValid: false,
            message: "Invalid email",
            type: "Error",
          });
        });
    } else {
      setValid({
        isValid: false,
        message: "Please don't enter empty email.",
        type: "Error",
      });
    }

  };

  return (
    <form className="reset-container login-form flex-column l-form-position">
      <div className="reset-header m-header flex">
        <h2 lassName="l-label">Password-Reset:</h2>
        <img
          className="m-close"
          onClick={cancelHandler}
          src={closeImg}
          alt="close-imgae"
        />
      </div>
      <input
        type="email"
        ref={emailRef}
        className="l-input"
        placeholder="example@gmail.com"
      />
      <button className="h-btn" onClick={sendHandler} type="button">
        Send
      </button>
    </form>
  );
};

export default ResetFrom;
