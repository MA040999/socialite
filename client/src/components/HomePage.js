import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CreatePost from "./CreatePost";
import Posts from "./Posts";

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      {user !== null && <CreatePost />}
      <Posts />
    </div>
  );
}

export default HomePage;
