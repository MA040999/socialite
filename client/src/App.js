import "./styles/App.css";

import { useEffect, useState } from "react";
import HomePage from "./components/HomePage";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NavBar from "./components/NavBar";
import { connect, useDispatch, useSelector } from "react-redux";
import { verifyRefreshToken } from "./redux/auth/authActions";
import PostInner from "./components/PostInner";
import CreatePost from "./components/CreatePost";
import { changeEditStatus } from "./redux/posts/postActions";
import Confirmation from "./components/Confirmation";
import GoToTop from "./components/GoToTop";
import Notification from "./components/Notification";

function App(props) {
  const dispatch = useDispatch();
  const [scroll, setScroll] = useState(false)

  const { user } = props;

  const editStatus = useSelector((state) => state.posts.isEditActive);
  const notificationMsg = useSelector((state) => state.posts.notificationMsg);
  const confirmationStatus = useSelector(
    (state) => state.posts.isConfirmationActive
  );

  const refreshToken = () => {
    dispatch(verifyRefreshToken());

    setTimeout(() => {
      refreshToken()
    }, 600000 - 1000); //10 minutes - 1 second
  }

  const checkScroll = () => {
    setScroll(window.scrollY > 0 ? true : false)
  }

  useEffect(() => {
    refreshToken()
  
    window.addEventListener('scroll', checkScroll)

    return ()=>{
      window.removeEventListener('scroll', checkScroll)
    }
   // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (editStatus || confirmationStatus) {
      document.body.className = "stop-scrolling";
    } else {
      document.body.className = "";
    }
  }, [confirmationStatus, editStatus]);

  return (
    <>
      {editStatus ? (
        <>
          <div
            style={{
              position: "fixed",
              zIndex: "99",
              width: "100%",
              height: "100%",
              backgroundColor: "black",
              opacity: "0.9",
            }}
          ></div>

          <div className="edit-post-container">
            <CreatePost isEditPost={true} />
            <div
              className="close-edit"
              onClick={() => dispatch(changeEditStatus())}
            >
              Close
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {confirmationStatus ? (
        <>
          <div
            style={{
              position: "fixed",
              zIndex: "99",
              width: "100%",
              height: "100%",
              backgroundColor: "black",
              opacity: "0.9",
            }}
          ></div>
          <Confirmation />
        </>
      ) : (
        ""
      )}
      <div className="App">
        {
          notificationMsg && <Notification/>
        }
        <NavBar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          {user === null && (
            <Route path="/login" exact render={() => <Login />} />
          )}

          {user === null && (
            <Route path="/signup" exact render={() => <Signup />} />
          )}
          <Route path="/post/:id" component={PostInner} />

          <Redirect to="/" />
        </Switch>

        {
          scroll && <GoToTop/>
        }
        {/* <pre>{JSON.stringify(expiresIn, null, 2)}</pre> */}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(App);
