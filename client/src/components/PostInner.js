import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPosts } from "../redux/posts/postActions";
// import Comment from "./Comment";
import CreatePost from "./CreatePost";
import Post from "./Post";
function PostInner() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const post = useSelector((state) => state.posts.posts).find(
    (data) => data._id === id
  );
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPosts());
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      {post ? (
        <Post
          id={id}
          content={post.content}
          creator={post.creator}
          name={post.name}
          displayImage={post.displayImage}
          createdAt={post.createdAt}
          user={user}
          likeCount={post.likeCount}
          images={post.images}
        />
      ) : (
        ""
      )}

      {user && (
        <>
          <div className="comments-container">
            {/* <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment /> */}
          </div>
          <CreatePost isComment={true} />
        </>
      )}
    </div>
  );
}

export default PostInner;
