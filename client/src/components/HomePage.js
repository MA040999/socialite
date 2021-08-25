import React from "react";
import CreatePost from "./CreatePost";
import Posts from "./Posts";

function HomePage() {
  return (
    <div>
      <CreatePost/>
      <Posts />
    </div>
  );
}

export default HomePage;
