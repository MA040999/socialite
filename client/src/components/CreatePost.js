import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import TextareaAutosize from "react-textarea-autosize";
import { RiSendPlaneFill } from "react-icons/ri";
import {useDispatch, useSelector} from 'react-redux'
import { createPost } from "../redux/posts/postActions";

function CreatePost({ isComment }) {
  const dispatch = useDispatch()
  const [imagesFileArray, setImagesFileArray] = useState([]);
  const [imageUrls, setImageUrls] = useState([])
  const [postInput, setPostInput] = useState("")

  const handleSubmit = () => {
    let formData = new FormData()
    Array.from(imagesFileArray).map(file=>{
      formData.append('file', file)
    })
    formData.append('content', postInput)
    
    dispatch(createPost(formData))
  }

  const handleSelectImage = (e) => {
    const files = e.target.files
    const urls = [];
    const array = [];

    Array.from(files).map(file => {
      const isSelected = imagesFileArray.find(
        (image) => image.name === file.name
      );
      if (!isSelected) {
        urls.push(URL.createObjectURL(file))
        array.push(file)
      }
    })
    setImagesFileArray([...imagesFileArray, ...array]);
    setImageUrls([...imageUrls, ...urls])
    e.target.value = ""
  }
 
  const removeImage = (index) => {
    setImagesFileArray((oldImages) => {
      const newImages = [...oldImages];
      newImages.splice(index, 1);
      return newImages;
    });
    setImageUrls((oldImages) => {
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
            {/* <input
              type="file"
              accept="image/*"
              multiple={true}
              onChange= {e => handleSelectImage(e)}
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
            /> */}
            <input
              type="file"
              accept="image/*"
              multiple
              name="imageFile"
              onChange= {e => handleSelectImage(e)}
            />
          </div>
        )}
        <RiSendPlaneFill className="icon" onClick={handleSubmit} />
      </div>
      {imageUrls.length > 0 && (
        <div className="post-images-container  create-post-images">
          {imageUrls.map((image, index) => (
            <div key={index} className="image-container">
              <img src={image} className="image" alt="user" />
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

      {/* <pre style={{ color: "black" }}>{JSON.stringify(imagesFileArray, null, 2)}</pre>
      <pre style={{ color: "black" }}>{JSON.stringify(imageUrls, null, 2)}</pre> */}
    </div>
  );
}

export default CreatePost;
