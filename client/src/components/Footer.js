import React from "react";
import { useSelector } from "react-redux";

function Footer() {
  const isComment = useSelector((state) => state.posts.isCommentActive);

  return (
    <div className={`footer ${isComment ? "footer-comment" : ""}`}>
      &copy; 2021 Made by <b>Muhammed Ahmed</b>
    </div>
  );
}

export default Footer;
