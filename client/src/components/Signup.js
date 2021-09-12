import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { signup, authError } from "../redux/auth/authActions";
import { validateEmail } from "../common/common";

function Signup(props) {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");

  const history = useHistory();
  const { signup, error, err } = props;

  const validateData = (email, fullname, password) => {
    if (email === "" || fullname === "" || password === "") {
      setMsg("");
      error("Please fill all the fields");
    } else {
      if (validateEmail(email)) {
        if (password === confirmPassword) {
          error("");
          signup({ fullname, email, password }, history);
        } else {
          error("Passwords are not matching");
        }
      } else {
        error("Email address is invalid.");
      }
    }
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    validateData(email, fullname, password);
  };

  return (
    <form className="login-container" onSubmit={(e) => handleSubmit(e)}>
      {msg ? <div className="msg">{msg}</div> : ""}
      {err ? <div className="err">{err}</div> : ""}
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

const mapStateToProps = (state) => {
  return {
    isAuth: state.isAuth,
    user: state.user,
    err: state.err,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: ({ fullname, email, password }, history) =>
      dispatch(signup({ fullname, email, password }, history)),
    error: (msg) => {
      dispatch(authError(msg));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
