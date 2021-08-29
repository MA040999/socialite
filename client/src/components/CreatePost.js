import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import TextareaAutosize from "react-textarea-autosize";
import { RiSendPlaneFill } from "react-icons/ri";

function CreatePost({ isComment }) {
  const [images, setImages] = useState([]);

  const removeImage = (index) => {
    setImages((oldImages) => {
      const newImages = [...oldImages];
      newImages.splice(index, 1);
      return newImages;
    });
  };

  return (
    <div
      className={`post-container ${isComment ? "comment-maker" : ""}`}
      style={{ marginBottom: "70px" }}
    >
      <div className="post-heading-container">
        <div className="post-image">
          <img src="/favicon.ico" alt="user" />
        </div>
        <TextareaAutosize
          name="createPost"
          className="post-input"
          placeholder={
            isComment ? "Leave a comment..." : "What's on your mind?"
          }
          autoComplete="off"
        />
        {isComment ? (
          ""
        ) : (
          <div className="image-upload-container">
            <FileBase64
              type="file"
              multiple={true}
              onDone={(base64) => {
                const arr = [];
                base64.map((file) => {
                  if (file.type.includes("image/")) {
                    const isSelected = images.find(
                      (image) => image.name === file.name
                    );
                    if (isSelected === undefined) {
                      arr.push({ base64: file.base64, name: file.name });
                    }
                  }
                  return null;
                });
                setImages([...images, ...arr]);
              }}
            />
          </div>
        )}
        <RiSendPlaneFill className="icon" />
      </div>
      {images.length > 0 && (
        <div className="post-images-container  create-post-images">
          {images.map((image, index) => (
            <div key={image.name} className="image-container">
              <img src={`${image.base64}`} className="image" alt="user" />
              <div
                className="container cross cancel"
                onClick={() => removeImage(index)}
              >
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* <pre style={{ color: "black" }}>{JSON.stringify(images, null, 2)}</pre> */}
    </div>
  );
}

export default CreatePost;
