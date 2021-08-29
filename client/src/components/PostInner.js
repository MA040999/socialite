import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import CreatePost from "./CreatePost";
import Post from "./Post";
function PostInner() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Post />
      <div className="comments-container">
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
      <CreatePost isComment={true} />
    </div>
  );
}

export default PostInner;
