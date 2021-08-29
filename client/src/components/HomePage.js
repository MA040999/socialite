import React, { useEffect } from "react";
import CreatePost from "./CreatePost";
import Posts from "./Posts";

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <CreatePost />
      <Posts />
    </div>
  );
}

export default HomePage;
