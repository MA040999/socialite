import React, { useEffect } from "react";
import Post from "./Post";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/posts/postActions";

function Posts() {
  const dispatch = useDispatch();

  const history = useHistory();
  const posts = useSelector((state) => state.posts.posts);
  const user = useSelector((state) => state.auth.user);
  const page = useSelector(state => state.posts.page)

  function handleClick(id) {
    history.push(`/post/${id}`);
  }

  const fetchPosts = (pageNo) => {
    dispatch(getPosts(pageNo));
  };

  useEffect(() => {
    fetchPosts(page);

    // eslint-disable-next-line
  }, [page]);

  return (
    <>
      <div>
        {posts.map((post) => {
          return (
            <Post
              key={post._id}
              onPress={() => {
                handleClick(post._id);
              }}
              id={post._id}
              user={user}
              creator={post.creator}
              name={post.name}
              displayImage={post.displayImage}
              content={post.content}
              createdAt={post.createdAt}
              likeCount={post.likeCount}
              images={post.images}
            />
          );
        })}
      </div>
    </>
  );
}

export default Posts;
