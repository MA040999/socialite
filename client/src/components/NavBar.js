import React, { useState, useRef, useEffect } from "react";
// import { GiHamburgerMenu, GiReactor } from "react-icons/gi";
// import { FaTimes, FaUserCircle } from "react-icons/fa";
import { connect } from "react-redux";
import { logout } from "../redux/auth/authActions";
import { Link, useHistory } from "react-router-dom";

function NavBar(props) {
  let menuRef = useRef();
  const { isAuth, user, logout } = props;

  const history = useHistory();

  const handleClick = () => {
    logout(history);
    // await axios.get("/logout/");
    // setIsAuthenticated(false);
    // history.push("/login");
  };

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="navbar">
      <div>
        <Link
          to="/"
          style={{ color: "rgb(238, 238, 238)" }}
          className="link logo"
        >
          {/* <GiReactor /> */}
        </Link>
      </div>
      <nav ref={menuRef}>
        <div className="hamburger nav-item" onClick={() => setIsOpen(!isOpen)}>
          {/* {isOpen ? <FaTimes /> : <GiHamburgerMenu />} */}
        </div>
        <ul className={isOpen ? "active" : ""}>
          {isAuth ? (
            <div className="authenticated">
              <li>
                <div style={{ fontSize: "2rem" }} className="avatar">
                  {/* <FaUserCircle /> */}
                </div>
                {/* <img className="avatar" src="logo192.png" alt="" /> */}
                {/* <div className="avatar">{currentUser.fullname.charAt(0)}</div> */}
              </li>
              <li>
                <div className="username">{user.fullname}</div>
              </li>
              <li>
                <Link to="/dashboard" className="link nav-item">
                  Dashboard
                </Link>
              </li>
              <li>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={handleClick}
                  className="link nav-item"
                >
                  Logout
                </div>
              </li>
            </div>
          ) : (
            <li>
              <Link to="/login" className="link nav-item">
                Login
              </Link>
            </li>
          )}

          {isAuth ? (
            ""
          ) : (
            <li>
              <Link to="/signup" className="link nav-item">
                Sign Up
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
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
    logout: (history) => dispatch(logout(history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
