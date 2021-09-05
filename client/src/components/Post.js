import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { API_BASE_URL } from "../common/common";
import moment from "moment";
// import { useHistory } from "react-router-dom";

function Post(props) {
  // const history = useHistory();

  const { isComment, onPress, content, createdAt, likeCount, images, id } =
    props;

  const handleEditPost = (e, id) => {
    e.stopPropagation();
    console.log(`id`, id);
  };

  return (
    <div className={`post-container`}>
      <div className="post-heading-container">
        <div className="post-image">
          <img src="/favicon.ico" alt="user" />
        </div>
        <div className="post-username">
          <h3 className="post-name">Muhammed Ahmed</h3>
          <span className="post-duration">{moment(createdAt).fromNow()}</span>
        </div>
        {isComment ? (
          ""
        ) : (
          <div className="icons-container">
            <div className="icons-container-inner">
              <FiEdit
                onClick={(e) => handleEditPost(e, id)}
                className="icon"
                color="white"
              />
            </div>
            <div className="icons-container-inner">
              <BsFillTrashFill className="icon" color="white" />
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
            <AiOutlineHeart className="icon" color="white" />
            <span>{likeCount}</span>
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
