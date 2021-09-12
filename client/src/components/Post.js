import React from "react";
import { BiCommentDetail } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { FiEdit, FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { API_BASE_URL } from "../common/common";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  changeConfirmationStatus,
  changeEditStatus,
  changeSelectedPost,
  likePost,
} from "../redux/posts/postActions";
// import { useHistory } from "react-router-dom";

function Post(props) {
  // const history = useHistory();
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
    images,
    id,
    user,
  } = props;

  const isLiked = likeCount.includes(user?.id);

  const handleEditPost = (id) => {
    dispatch(changeEditStatus());
    dispatch(changeSelectedPost(id));
  };

  const handleLikeClick = () => {
    dispatch(likePost(id));
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
            <img src={API_BASE_URL + displayImage} alt="user" />
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
            return (
              <img
                key={index}
                className="image"
                src={API_BASE_URL + image}
                alt=""
              />
            );
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
            {isLiked ? (
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
            <span>{likeCount.length}</span>
          </div>
          <div className="icons-container-inner">
            <BiCommentDetail className="icon" color="white" onClick={onPress} />
            <span>26</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
