import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import TextareaAutosize from "react-textarea-autosize";
import { RiSendPlaneFill } from "react-icons/ri";
import {useDispatch, useSelector} from 'react-redux'
import { createPost } from "../redux/posts/postActions";

function CreatePost({ isComment }) {
  const dispatch = useDispatch()
  const [images, setImages] = useState([]);
  const [base64, setBase64] = useState([])
  const [postInput, setPostInput] = useState("")

  const handleSubmit = () => {
    dispatch(createPost(postInput, base64))
  }
 
  const removeImage = (index) => {
    setImages((oldImages) => {
      const newImages = [...oldImages];
      newImages.splice(index, 1);
      return newImages;
    });
    setBase64((oldImages) => {
      const newImages = [...oldImages];
      newImages.splice(index, 1);
      return newImages;
    })
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
          name="postInput"
          className="post-input"
          placeholder={
            isComment ? "Leave a comment..." : "What's on your mind?"
          }
          value={postInput}
          onChange={(e)=>setPostInput(e.target.value)}
          autoComplete="off"
        />
        {isComment ? (
          ""
        ) : (
          <div className="image-upload-container">
            <FileBase64
              type="file"
              multiple={true}
              onDone={(files) => {
                const arr1 = [];
                const arr2 = []
                files.map((file) => {
                  if (file.type.includes("image/")) {
                    const isSelected = images.find(
                      (image) => image.name === file.name
                    );
                    if (isSelected === undefined) {
                      arr1.push({ base64: file.base64, name: file.name });
                      arr2.push(file.base64)
                    }
                  }
                  return null;
                });
                setImages([...images, ...arr1]);
                setBase64([...base64, ...arr2])
              }}
            />
          </div>
        )}
        <RiSendPlaneFill className="icon" onClick={handleSubmit} />
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

      {/* <pre style={{ color: "black" }}>{JSON.stringify(images, null, 2)}</pre>
      <pre style={{ color: "black" }}>{JSON.stringify(base64, null, 2)}</pre> */}
    </div>
  );
}

export default CreatePost;
