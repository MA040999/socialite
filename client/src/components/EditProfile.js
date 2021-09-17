import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { API_BASE_URL } from '../common/common';
import { FiUpload } from 'react-icons/fi'
import { useHistory } from 'react-router';
import { updateProfile } from '../redux/auth/authActions';

function EditProfile() {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user);

    const [fullName, setFullName] = useState(user?.fullname)
    const [imageFile, setImageFile] = useState({});
    const [imageUrl, setImageUrl] = useState(null);

    const validateData = () => {
        if (imageUrl === null && fullName === "") return false;

        return true;
    };

    const handleSubmit = () => {
        if (validateData()) {
            let formData = new FormData();
            
            formData.append("file", imageFile);
            
            formData.append("fullname", fullName);
            
            dispatch(updateProfile(formData, history));
        }
      };

    const handleInputChange = (e) => {
        setFullName(e.target.value)
    }

    const handleSelectImage = (e) => {
        const file = e.target.files;
        const url = URL.createObjectURL(file[0])
        
        setImageFile(file[0]);
        setImageUrl(url);
        e.target.value = "";
      };

      useEffect(() => {
          setFullName(user?.fullname)
      }, [user])

    return (
        <div className='edit-profile-container'>
            <h2 className='edit-profile-heading'>Edit Profile</h2>
            <div className='edit-profile-image'>
                {user?.displayImage ? (
                    <img src={imageUrl ? imageUrl : API_BASE_URL + user?.displayImage} alt="user" />
                  ) : (
                    <img src={imageUrl ? imageUrl : "/user-circle.svg"} alt="user" />
                )}
                <div className='upload-container'>
                    <label className="icon-label" htmlFor="file-upload">
                        <FiUpload/>
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        name="imageFile"    
                        onChange={(e) => handleSelectImage(e)}
                    />
                </div>    
            </div>
            <input type="text" className="edit-profile-input" defaultValue={fullName} onChange={(e)=>handleInputChange(e)}/>
            <button onClick={handleSubmit} className='login-btn'>Save</button>
            {/* <pre>{JSON.stringify(fullName, null, 2)}</pre> */}
        </div>
    )
}

export default EditProfile
