import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removePosts } from "../redux/posts/postActions";
import CreatePost from "./CreatePost";
import Posts from "./Posts";

function HomePage() {
  const dispatch = useDispatch()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    return () => {
      dispatch(removePosts())
    }
    //eslint-disable-next-line
  }, [])

  return (
    <div>
      {user !== null && <CreatePost />}
      <Posts /> 
    </div>
  );
}

export default HomePage;
