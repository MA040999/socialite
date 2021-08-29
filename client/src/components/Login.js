import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { login, authError } from "../redux/auth/authActions";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [err, setErr] = useState("");

  const { login, error, err } = props;
  const history = useHistory();

  let handleSubmit = function (e) {
    e.preventDefault();
    if (username === "" || password === "") {
      error("Please fill both the fields");
      // setErr("Please fill both the fields");
    } else {
      // setErr("");
      error("");
      login({ username, password }, history);

      // try {
      //   // const user = await axios.post("/login/", { username, password });
      //   // setCurrentUser(user.data);
      //   // setIsAuthenticated(true);
      //   // history.push("/dashboard");
      // } catch (error) {
      //   setErr(error.response.data.message);
      // }
    }
  };

  return (
    <form
      className="login-container"
      onSubmit={(e) => handleSubmit(e)}
      autoComplete="off"
    >
      {err ? <div className="err">{err}</div> : ""}
      <h2>LOGIN</h2>
      <div className="login-input-container">
        <input
          className="login-input"
          label="Email"
          type="text"
          placeholder="Email Address"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login-input"
          label="Password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="login-btn">
        Login
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
    login: ({ username, password }, history) =>
      dispatch(login({ username, password }, history)),
    error: (msg) => {
      dispatch(authError(msg));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
