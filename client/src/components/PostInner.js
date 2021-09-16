import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { changeComment, getPostById, removePost } from "../redux/posts/postActions";
// import Comment from "./Comment";
import CreatePost from "./CreatePost";
import Post from "./Post";
import Comment from './Comment'
function PostInner() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const commentRef = useRef()
  const post = useSelector((state) => state.posts.post)
  const user = useSelector((state) => state.auth.user);
  const comments = post?.comments

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPostById(id));
    dispatch(changeComment())

    return () => {
      dispatch(removePost())
      dispatch(changeComment())
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    commentRef.current.scrollIntoView({behavior: 'smooth'})
  }, [comments])
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
          comments={post.comments}
          likeCount={post.likeCount}
          images={post.images}
        />
      ) : (
        ""
      )}
      <div className="comments-container">
        {comments?.map(comment=>
          <Comment key={comment._id} comment={comment} />
        )}
        <div ref={commentRef}/>
        
      </div>
      {
        user && (
          <CreatePost isComment={true} commentRef={commentRef} />
        )
      }
    </div>
  );
}

export default PostInner;
