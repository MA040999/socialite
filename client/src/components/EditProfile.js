import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUpload } from "react-icons/fi";
import { useHistory } from "react-router";
import { updateProfile } from "../redux/auth/authActions";
import { addNotificationMsg } from "../redux/posts/postActions";

function EditProfile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [fullName, setFullName] = useState(user?.fullname);
  const [imageFileData, setImageFileData] = useState(null);

  const validateData = () => {
    if (imageFileData === null && fullName === "") return false;

    return true;
  };

  const handleSubmit = () => {
    if (validateData()) {
      dispatch(
        updateProfile({ fullname: fullName, file: imageFileData }, history)
      );
    }
  };

  const handleInputChange = (e) => {
    setFullName(e.target.value);
  };

  const handleSelectImage = (e) => {
    const file = e.target.files[0];

    if (file.size <= 2097152) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageFileData(reader.result);
      };
    } else {
      dispatch(addNotificationMsg("File Exceeds Size Limit - 2MB"));
    }

    e.target.value = "";
  };

  useEffect(() => {
    setFullName(user?.fullname);
  }, [user]);

  return (
    <div className="edit-profile-container">
      <h2 className="edit-profile-heading">Edit Profile</h2>
      <div className="edit-profile-body">
        <div className="edit-profile-image">
          {user?.displayImage ? (
            <img
              src={imageFileData ? imageFileData : user?.displayImage}
              alt="user"
            />
          ) : (
            <img
              src={imageFileData ? imageFileData : "/user-circle.svg"}
              alt="user"
            />
          )}
          <label className="upload-container" htmlFor="file-upload">
            <FiUpload />
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".png, .jpg, .jpeg"
            name="imageFile"
            onChange={(e) => handleSelectImage(e)}
          />
        </div>
        <input
          type="text"
          className="edit-profile-input"
          defaultValue={fullName}
          onChange={(e) => handleInputChange(e)}
        />
        <button onClick={handleSubmit} className="login-btn">
          Save
        </button>
      </div>
      {/* <pre>{JSON.stringify(fullName, null, 2)}</pre> */}
    </div>
  );
}

export default EditProfile;
