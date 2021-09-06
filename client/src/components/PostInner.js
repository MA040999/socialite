import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import Comment from "./Comment";
import CreatePost from "./CreatePost";
import Post from "./Post";
function PostInner() {
  const { id } = useParams();
  const post = useSelector((state) => state.posts.posts).find(
    (data) => data._id === id
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Post
        content={post.content}
        createdAt={post.createdAt}
        likeCount={post.likeCount}
        images={post.images}
      />
      <div className="comments-container">
        {/* <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment /> */}
      </div>
      <CreatePost isComment={true} />
    </div>
  );
}

export default PostInner;
