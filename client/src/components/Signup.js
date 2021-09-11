import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { signup, authError } from "../redux/auth/authActions";

function Signup(props) {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  // const [err, setErr] = useState("");

  const history = useHistory();
  const { signup, error, err } = props;

  let handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || fullname === "" || password === "") {
      setMsg("");
      // setErr("Please fill all the fields");
      error("Please fill both the fields");
    } else {
      if (password === confirmPassword) {
        error("");
        signup({ fullname, email, password }, history);
        // setErr("");
        // axios.post("/signup", { fullname, email, password }).then((res) => {
        //   setCurrentUser({ id: res.data.id, fullname: res.data.fullname });
        //   setIsAuthenticated(true);
        //   setFullname("");
        //   setEmail("");
        //   setPassword("");
        //   history.push("/dashboard");
        // });
      } else {
        error("Passwords are not matching");
      }
    }
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
