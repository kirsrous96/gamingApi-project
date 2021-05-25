import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import './Message.css'

function Message({ message, timestamp, user, userImage}) {
  const userU = useSelector(selectUser);
    return (
        <div className={`${userU.displayName === user ? 'Umessage' : 'message'}`}>
            <img src={userImage} alt="" />
            <div className="messageInfo">
            <h4>
          {user}{" "}
          <span className="message__timestamp">
            {new Date(timestamp?.toDate()).toUTCString()}
          </span>
        </h4>
        <p>{message}</p>
            </div>
        </div>
    )
}

export default Message
