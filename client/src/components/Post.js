import React, { useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { FiEdit, FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  changeConfirmationStatus,
  changeEditStatus,
  changeSelectedPost,
  likePost,
} from "../redux/posts/postActions";

function Post(props) {
  const dispatch = useDispatch();

  const {
    isComment,
    onPress,
    content,
    createdAt,
    creator,
    displayImage,
    name,
    likeCount,
    comments,
    images,
    id,
    user,
  } = props;

  const [like, setLike] = useState(likeCount?.includes(user?.id));
  const [likeLength, setLikeLength] = useState(likeCount?.length);

  const handleEditPost = (id) => {
    dispatch(changeEditStatus());
    dispatch(changeSelectedPost(id));
  };

  const handleLikeClick = () => {
    if (user) {
      setLike(!like);
      setLikeLength((prev) => (like ? prev - 1 : prev + 1));
      dispatch(likePost(id));
    } else {
      dispatch(likePost(id));
    }
  };

  const handleTrashClick = () => {
    dispatch(changeConfirmationStatus());
    dispatch(changeSelectedPost(id));
  };

  return (
    <div className={`post-container`}>
      <div className="post-heading-container">
        <div className="post-image">
          {displayImage ? (
            <img src={displayImage} alt="user" />
          ) : (
            <img src="/user-circle.svg" alt="user" />
          )}
        </div>
        <div className="post-username">
          <h3 className="post-name">{name}</h3>
          <span className="post-duration">{moment(createdAt).fromNow()}</span>
        </div>
        {isComment || user?.id !== creator ? (
          ""
        ) : (
          <div className="icons-container">
            <div className="icons-container-inner">
              <FiEdit
                onClick={() => handleEditPost(id)}
                className="icon"
                color="white"
              />
            </div>
            <div className="icons-container-inner">
              <BsFillTrashFill
                className="icon"
                color="white"
                onClick={handleTrashClick}
              />
            </div>
          </div>
        )}
      </div>
      <div className="post-body-container">
        <p>{content}</p>
      </div>

      {isComment ? (
        ""
      ) : images.length > 0 ? (
        <div className="post-images-container">
          {images.map((image, index) => {
            return <img key={index} className="image" src={image} alt="" />;
          })}
        </div>
      ) : (
        ""
      )}
      {isComment ? (
        ""
      ) : (
        <div className="icons-container like-comment-container">
          <div className="icons-container-inner">
            {like ? (
              <FaHeart
                className="icon"
                color="white"
                onClick={handleLikeClick}
              />
            ) : (
              <FiHeart
                className="icon"
                color="white"
                onClick={handleLikeClick}
              />
            )}
            <span>{likeLength}</span>
          </div>
          <div className="icons-container-inner">
            <BiCommentDetail className="icon" color="white" onClick={onPress} />
            <span>{comments.length}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
