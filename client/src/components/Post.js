import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
function Post() {
  return (
    <div className="post-container">
      <div className="post-heading-container">
        <div className="post-image">
          <img src="/favicon.ico" alt="user" />
        </div>
        <div className="post-username">
          <h3 className="post-name">Muhammed Ahmed</h3>
          <span className="post-duration">3 minutes ago</span>
        </div>
        <div className="like-comment-container">
          <div className="post-like-comment">
            <AiOutlineHeart className="icon" color="white" />
            <span>154</span>
          </div>
          <div className="post-like-comment">
            <BiCommentDetail className="icon" color="white" />
            <span>26</span>
          </div>
        </div>
      </div>
      <div className="post-body-container">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero
          laudantium impedit vero? Tenetur dolores velit amet assumenda
          exercitationem excepturi quas similique et, optio aperiam harum quidem
          cum perferendis iusto rerum.
        </p>
      </div>
      <div className="post-images-container">
        <img src="/favicon.ico" alt="" />
        <img src="/favicon.ico" alt="" />
        <img src="/favicon.ico" alt="" />
        <img src="/favicon.ico" alt="" />
        <img src="/favicon.ico" alt="" />
        <img src="/favicon.ico" alt="" />
      </div>
    </div>
  );
}

export default Post;
