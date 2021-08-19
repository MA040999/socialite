import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { signup, authError } from "../redux/auth/authActions";

function Signup(props) {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  // const [err, setErr] = useState("");

  const history = useHistory();
  const { signup, error, err } = props;

  let handleSubmit = (e) => {
    e.preventDefault();
    if (username === "" || fullname === "" || password === "") {
      setMsg("");
      // setErr("Please fill all the fields");
      error("Please fill both the fields");
    } else {
      error("");
      signup({ fullname, username, password }, history);
      // setErr("");
      // axios.post("/signup", { fullname, username, password }).then((res) => {
      //   setCurrentUser({ id: res.data.id, fullname: res.data.fullname });
      //   setIsAuthenticated(true);
      //   setFullname("");
      //   setUsername("");
      //   setPassword("");
      //   history.push("/dashboard");
      // });
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
      {msg ? <div className="msg">{msg}</div> : ""}
      {err ? <div className="err">{err}</div> : ""}
      <div style={{ marginTop: "3rem" }}>
        <input
          label="Fullname"
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div style={{ marginTop: "3rem" }}>
        <input
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div style={{ marginTop: "3rem" }}>
        <input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
    signup: ({ fullname, username, password }, history) =>
      dispatch(signup({ fullname, username, password }, history)),
    error: (msg) => {
      dispatch(authError(msg));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
