import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { changeConfirmationStatus, deletePost } from '../redux/posts/postActions';

function Confirmation() {
    const dispatch = useDispatch()
    const history = useHistory()
    const selectedPost = useSelector(state => state.posts.selectedPost)
    const isCommentActive = useSelector(state => state.posts.isCommentActive)

    const handleNoClick = () => {
        dispatch(changeConfirmationStatus())
      };
    const handleYesClick = () => {
        if(isCommentActive){
            dispatch(deletePost(selectedPost, history));
        }
        else{
            dispatch(deletePost(selectedPost));
        }
        dispatch(changeConfirmationStatus())
      };
     
    return (
        <div className="confirmation-container">
            <p className='confirmation-text'>Are you sure you want to delete this post?</p>
            <div className='confirmation-button-container'>
                <button className='confirmation-button' onClick={handleYesClick}>Yes</button>
                <button className='confirmation-button' onClick={handleNoClick}>No</button>
            </div>
        </div>
    )
}

export default Confirmation
