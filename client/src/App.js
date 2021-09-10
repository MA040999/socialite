import "./styles/App.css";

import { useEffect } from "react";
import HomePage from "./components/HomePage";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NavBar from "./components/NavBar";
// import Dashboard from "./components/Dashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
import { connect, useDispatch, useSelector } from "react-redux";
import { verifyAuth } from "./redux/auth/authActions";
import PostInner from "./components/PostInner";
import CreatePost from "./components/CreatePost";
import { changeEditStatus } from "./redux/posts/postActions";
import Confirmation from "./components/Confirmation";

function App(props) {
  const dispatch = useDispatch();
  const { isAuth, verifyAuth } = props;

  const editStatus = useSelector((state) => state.posts.isEditActive);
  const confirmationStatus = useSelector((state) => state.posts.isConfirmationActive);

  // const getInitialState = async () => {
  //   let bool;
  //   await axios
  //     .get(`/auth/`)
  //     .then((res) => {
  //       bool = true;
  //     })
  //     .catch((err) => {
  //       bool = false;
  //     });
  //   console.log("bool1 :>> ", bool);
  //   return bool;
  // }
  // const [isAuthenticated, setIsAuthenticated] = useState();
  // const [currentUser, setCurrentUser] = useState({});

  // const fetchData = async () => {
  //   const result = await auth();

  //   setIsAuthenticated(result);
  // };

  // const auth = async () => {
  //   let bool;
  //   await axios
  //     .get(`/auth/`)
  //     .then((res) => {
  //       setCurrentUser(res.data);
  //       bool = true;
  //     })
  //     .catch(() => {
  //       bool = false;
  //     });

  //   return bool;
  // };
  useEffect(() => {
    if(editStatus || confirmationStatus){
      document.body.className = 'stop-scrolling'
    }
    else{
      document.body.className = ''
    }
    
}, [confirmationStatus, editStatus])

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

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
          <Confirmation/>
        </>
      ) : (
        ""
      )}
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          {isAuth === false && (
            <Route path="/login" exact render={() => <Login />} />
          )}

          {isAuth === false && (
            <Route path="/signup" exact render={() => <Signup />} />
          )}
          <Route path="/post/:id" component={PostInner} />

          {/* <ProtectedRoute
          path="/dashboard"
          component={Dashboard}
          isAuthenticated={isAuth}
        /> */}
          {/* {isAuthenticated && (
            <Route path="/dashboard" exact component={Dashboard} />
          )} */}
          {/* <Redirect to="/login" from="/dashboard" /> */}
          <Redirect to="/" />
        </Switch>

        {/* <pre>{JSON.stringify(isAuth, null, 2)}</pre> */}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verifyAuth: () => dispatch(verifyAuth()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
