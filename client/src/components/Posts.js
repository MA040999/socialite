import React, { useEffect } from "react";
import Post from "./Post";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changePage, getPosts } from "../redux/posts/postActions";
import InfiniteScroll from 'react-infinite-scroll-component';


function Posts() {
  const dispatch = useDispatch();

  const history = useHistory();
  const posts = useSelector((state) => state.posts.posts.filter((post, index, self) =>
  index === self.findIndex((p) => (
    p._id === post._id
  ))));
  const user = useSelector((state) => state.auth.user);
  const page = useSelector(state => state.posts.page)
  const maxPages = useSelector(state => state.posts.maxPages)
  const isSearchActive = useSelector(state => state.posts.isSearchActive)


  function handleClick(id) {
    history.push(`/post/${id}`);
  }

  const fetchPosts = () => {
    dispatch(changePage())
    if(!isSearchActive) dispatch(getPosts(page+1));
  };  

  useEffect(() => {
    if(!isSearchActive) dispatch(getPosts(page));
    
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <InfiniteScroll
        style={{overflow: 'visible'}}
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={page < maxPages ? true : false}
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
              comments={post.comments}
              images={post.images}
            />
          );
        })}
      </InfiniteScroll>
        
    </>
  );
}

export default Posts;
