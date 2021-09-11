import React, { useState, useRef, useEffect } from "react";
// import { GiHamburgerMenu, GiReactor } from "react-icons/gi";
import { connect } from "react-redux";
import { logout } from "../redux/auth/authActions";
import { Link, useHistory } from "react-router-dom";
import SearchBar from "./SearchBar";
import { API_BASE_URL } from "../common/common";

function NavBar(props) {
  let menuRef = useRef();
  const { user, logout } = props;

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
        <Link to="/" className="link logo">
          <h1 className="logo-h1">Socialite</h1>
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
                    <img src={API_BASE_URL + user?.displayImage} alt="user" />
                  ) : (
                    <img src="/profile-icon.png" alt="user" />
                  )}
                </div>
                {/* <img className="avatar" src="logo192.png" alt="" /> */}
                {/* <div className="avatar">{currentUser.fullname.charAt(0)}</div> */}
              </li>
              <li>
                <p className="username">{user.fullname}</p>
              </li>
              {/* <li>
                <Link to="/dashboard" className="link nav-item">
                  Dashboard
                </Link>
              </li> */}
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
