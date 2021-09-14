import React, { useEffect } from "react";
import Post from "./Post";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changePage, getPosts } from "../redux/posts/postActions";
import InfiniteScroll from 'react-infinite-scroll-component';


function Posts() {
  const dispatch = useDispatch();

  const history = useHistory();
  const posts = useSelector((state) => state.posts.posts);
  const user = useSelector((state) => state.auth.user);
  const page = useSelector(state => state.posts.page)
  const maxPages = useSelector(state => state.posts.maxPages)


  function handleClick(id) {
    history.push(`/post/${id}`);
  }

  const fetchPosts = () => {
    dispatch(changePage())
    dispatch(getPosts(page));
  };  

  useEffect(() => {
    dispatch(getPosts(page));

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={page < maxPages ? true : false}
        loader={<div key={0}>Loading ...</div>}
      >
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
      </InfiniteScroll>
        
      </div>
    </>
  );
}

export default Posts;
