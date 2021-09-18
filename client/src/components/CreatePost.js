import React, { useEffect, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { BiImageAdd } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotificationMsg,
  changeEditStatus,
  comment,
  createPost,
  updatePost,
} from "../redux/posts/postActions";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { useParams } from "react-router";

function CreatePost({ isComment, isEditPost }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const isEdit = useSelector((state) => state.posts.isEditActive);
  const selectedPost = useSelector((state) => state.posts.selectedPost);
  const postData = useSelector((state) => {
    if (state.posts.post) {
      return state.posts.post;
    } else {
      return state.posts.posts.find((post) => post._id === selectedPost);
    }
  });
  const user = useSelector((state) => state.auth.user);

  const [imagesFileArray, setImagesFileArray] = useState([]);
  const [postInput, setPostInput] = useState("");
  const [imageFileData, setImageFileData] = useState([]);

  const clearInputs = () => {
    setPostInput("");
    setImagesFileArray([]);
    setImageFileData([]);
  };

  const validateData = () => {
    if (isComment) {
      if (postInput === "") return false;
    } else {
      if (imageFileData.length === 0 && postInput === "") return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateData()) {
      if (isEdit) {
        dispatch(
          updatePost({ content: postInput, file: imageFileData }, selectedPost)
        );
        dispatch(changeEditStatus());
      } else if (isComment) {
        dispatch(comment({ content: postInput }, id));
        clearInputs();
      } else {
        dispatch(createPost({ content: postInput, file: imageFileData }));
        clearInputs();
      }
    }
  };

  const handleSelectImage = (e) => {
    const file = e.target.files[0];

    if (file.size <= 4194304) {
      const isSelected = imagesFileArray.find(
        (image) => image.name === file.name
      );
      if (!isSelected) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImageFileData([...imageFileData, reader.result]);
        };
        setImagesFileArray([...imagesFileArray, file]);
      } else {
        dispatch(addNotificationMsg("Image already selected"));
      }
    } else {
      dispatch(addNotificationMsg("File Exceeds Size Limit - 4MB"));
    }
    e.target.value = "";
  };

  const removeImage = (index) => {
    setImagesFileArray((oldImages) => {
      const newImages = [...oldImages];
      newImages.splice(index, 1);
      return newImages;
    });
    setImageFileData((oldImages) => {
      const newImages = [...oldImages];
      newImages.splice(index, 1);
      return newImages;
    });
  };

  useEffect(() => {
    if (isEdit) {
      setPostInput(postData.content);
      setImageFileData(postData.images);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={`post-container ${isComment ? "comment-maker" : ""} ${
        isEditPost ? "edit-post" : ""
      }`}
      style={{ marginBottom: "70px" }}
    >
      <div className="post-heading-container">
        <div className={`post-image`}>
          {user?.displayImage ? (
            <img src={user?.displayImage} alt="user" />
          ) : (
            <img src="/user-circle.svg" alt="user" />
          )}
        </div>
        <TextareaAutosize
          name="postInput"
          className="post-input"
          placeholder={
            isComment ? "Leave a comment..." : "What's on your mind?"
          }
          minRows={1}
          maxRows={isComment ? 4 : 10}
          value={postInput}
          onChange={(e) => setPostInput(e.target.value)}
          autoComplete="off"
        />

        <div className={`icons-container scroll-bar-margin creator`}>
          {isComment ? (
            ""
          ) : (
            <>
              <label className="icon-label" htmlFor="file-upload">
                <BiImageAdd
                  className={`icon ${isEditPost ? "edit-post-icon" : ""}`}
                  color="white"
                />
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".png, .jpg, .jpeg"
                name="imageFile"
                onChange={(e) => handleSelectImage(e)}
              />
            </>
          )}
          <RiSendPlaneFill
            className={`icon ${isEditPost ? "edit-post-icon" : ""}`}
            color="white"
            onClick={handleSubmit}
          />
        </div>
      </div>
      {imageFileData.length > 0 && (
        <div className="post-images-container  create-post-images">
          {imageFileData.map((image, index) => (
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

      {/* <pre style={{ color: "black" }}>{JSON.stringify(imagesFileArray, null, 2)}</pre> */}
      {/* <pre style={{ color: "black" }}>
        {JSON.stringify(imageFileData, null, 2)}
      </pre> */}
    </div>
  );
}

export default CreatePost;
