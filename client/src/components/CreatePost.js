import React, { useState } from 'react'
import FileBase64 from 'react-file-base64'
import TextareaAutosize from 'react-textarea-autosize';

function CreatePost() {
    const [images, setImages] = useState([])

    const removeImage = () => {
        setImages()
    }
   
    return (
        <div className="post-container" style={{marginBottom: '70px'}}>
            <div className="post-heading-container">
                <div className="post-image">
                    <img src="/favicon.ico" alt="user" />
                </div>
                <TextareaAutosize
                    name="createPost"
                    className="post-input"
                    placeholder="What's on your mind?"
                    autoComplete="off"
                />
                <div className='image-upload-container'>
                    <FileBase64
                        type="file"
                        multiple={true}
                        onDone={(base64)=> {
                            setImages([...images, ...base64])  
                        } }
                    />
                </div>
            </div>
            {
                images.length > 0 && <div className="post-images-container  create-post-images">
                {
                    images.map( (image,id) =>  <div key={id} className='image-container'>
                        <img src={ `${image.base64}`} className='image' alt="user" />
                        <div className="container cross cancel" onClick={removeImage}>
                            <div className="line"></div>
                            <div className="line"></div>
                            <div className="line"></div>
                        </div>                    
                    </div>
                    )
                }
            </div>
            }
            
            {/* <pre>{JSON.stringify(images, null, 2)}</pre> */}
        </div>
    )
}

export default CreatePost
