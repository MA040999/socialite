import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { API_BASE_URL } from "../common/common";
// import { useHistory } from "react-router-dom";

function Post(props) {
  // const history = useHistory();

  const { isComment, onPress, content, createdAt, likeCount, images } = props;

  return (
    <div
      className={`post-container ${onPress !== undefined ? "clickable" : ""}`}
      onClick={onPress}
    >
      <div className="post-heading-container">
        <div className="post-image">
          <img src="/favicon.ico" alt="user" />
        </div>
        <div className="post-username">
          <h3 className="post-name">Muhammed Ahmed</h3>
          <span className="post-duration">{createdAt.substring(0, 10)}</span>
        </div>
        {isComment ? (
          ""
        ) : (
          <div className="like-comment-container">
            <div className="post-like-comment">
              <AiOutlineHeart className="icon" color="white" />
              <span>{likeCount}</span>
            </div>
            <div className="post-like-comment">
              <BiCommentDetail className="icon" color="white" />
              <span>26</span>
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
    </div>
  );
}

export default Post;
