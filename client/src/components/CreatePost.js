import React from 'react'
import FileBase64 from 'react-file-base64'

function CreatePost() {
    return (
        <div className="post-container" style={{marginBottom: '70px'}}>
            <div className="post-heading-container">
                <div className="post-image">
                    <img src="/favicon.ico" alt="user" />
                </div>
                <input
                    name="createPost"
                    className="post-input"
                    placeholder="What's on your mind?"
                    autoComplete="off"
                />
                <div style={{backgroundColor: 'red'}}>
                    <FileBase64
                        type='file'
                        multiple={true}
                        onDone={({base64})=>{}}
                    />
                </div>
            </div>
        </div>
    )
}

export default CreatePost
