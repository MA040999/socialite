import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../redux/auth/authActions";
import { Link, useHistory } from "react-router-dom";
import SearchBar from "./SearchBar";

function NavBar(props) {
  let menuRef = useRef();
  const { user, logout } = props;

  const history = useHistory();

  const handleClick = () => {
    logout(history);
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
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="navbar">
      <div>
        <Link to="/">
          <img className="logo" src="logo-with-text-light.png" alt="logo" />
        </Link>
      </div>
      <SearchBar />
      <nav ref={menuRef}>
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <div className="container cross">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          ) : (
            <div className="container">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          )}
        </div>
        <ul className={isOpen ? "active" : ""}>
          {user ? (
            <div className="authenticated">
              <li>
                <div style={{ fontSize: "2rem" }} className="avatar">
                  {user?.displayImage ? (
                    <img src={user?.displayImage} alt="user" />
                  ) : (
                    <img src="/user-circle.svg" alt="user" />
                  )}
                </div>
              </li>
              <li>
                <p className="username">{user.fullname}</p>
              </li>
              <li>
                <Link to="/edit-profile" className="link nav-item">
                  Edit Profile
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

          {user ? (
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
    user: state.auth.user,
    err: state.auth.err,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (history) => dispatch(logout(history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
