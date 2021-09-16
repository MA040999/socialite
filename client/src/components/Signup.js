import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../redux/auth/authActions";
import { validateEmail } from "../common/common";
import { addNotificationMsg } from "../redux/posts/postActions";

function Signup() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();

  const validateData = (email, fullname, password) => {
    if (email === "" || fullname === "" || password === "") {
      dispatch(addNotificationMsg("Please fill all the fields"));
    } else {
      if (validateEmail(email)) {
        if (password === confirmPassword) {
          dispatch(signup({ fullname, email, password }, history));
        } else {
          dispatch(addNotificationMsg("Passwords are not matching"));
        }
      } else {
        dispatch(addNotificationMsg("Email address is invalid"));
      }
    }
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    validateData(email, fullname, password);
  };

  return (
    <form className="login-container" onSubmit={(e) => handleSubmit(e)}>
      <h2>SIGNUP</h2>
      <div className="login-input-container">
        <input
          className="login-input"
          label="Fullname"
          placeholder="Fullname"
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <input
          className="login-input"
          label="Email Address"
          placeholder="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          placeholder="Password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="login-input"
          placeholder="Confirm Password"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="login-btn">
        Sign Up
      </button>
    </form>
  );
}

export default Signup;
