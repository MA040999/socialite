import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeNotificationMsg } from '../redux/posts/postActions';

function Notification() {
    const dispatch = useDispatch()
    const notificationMsg = useSelector((state) => state.posts.notificationMsg);

    useEffect(() => {
        setTimeout(()=>{
          dispatch(removeNotificationMsg())
        }, 3000)
        
       // eslint-disable-next-line
      }, [notificationMsg])

    return (
        <div className="notification-container">
            <p>{notificationMsg}</p>
        </div>
    )
}

export default Notification
