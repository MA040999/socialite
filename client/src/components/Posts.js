import React from "react";
import Post from "./Post";
import { useHistory } from "react-router-dom";

function Posts() {
  const history = useHistory();

  function handleClick(id) {
    console.log(`id`, id);
    history.push(`/post/${id}`);
  }

  return (
    <div>
      <Post
        onPress={() => {
          handleClick(1);
        }}
      />
      <Post
        onPress={() => {
          handleClick(2);
        }}
      />
      <Post
        onPress={() => {
          handleClick(3);
        }}
      />
    </div>
  );
}

export default Posts;
