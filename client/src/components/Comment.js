import React from "react";
import Post from "./Post";

function Comment({comment}) {
  return <Post 
    isComment={true} 
    id={comment._id}
    content={comment.content}
    creator={comment.creator}
    name={comment.name}
    displayImage={comment.displayImage}
    createdAt={comment.createdAt}
  />;
}

export default Comment;
