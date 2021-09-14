import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage, removePosts } from "../redux/posts/postActions";
import CreatePost from "./CreatePost";
import Posts from "./Posts";

function HomePage() {
  const dispatch = useDispatch()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const user = useSelector((state) => state.auth.user);
  const page = useSelector(state => state.posts.page)
  const maxPages = useSelector(state => state.posts.maxPages)


  const handleClick = () => {
   
    if(maxPages && page < maxPages){
      dispatch(changePage())
    }
  }

  useEffect(() => {
    return () => {
      dispatch(removePosts())
    }
  }, [])

  return (
    <div>
      {user !== null && <CreatePost />}
      <Posts />
      {
        page >= maxPages ? '' : <button onClick={handleClick}>Load More...</button>
      }
      
    </div>
  );
}

export default HomePage;
