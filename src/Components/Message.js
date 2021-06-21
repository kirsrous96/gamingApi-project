import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { db } from '../firebase';
import './Message.css'

function Message({ message,messageId, timestamp,channelId, user, userImage}) {


  const userU = useSelector(selectUser);

  const deleteMessage = () =>{
    const messageColl = db.collection("rooms").doc(channelId).collection('messages').doc(messageId).delete().then(() => {
      console.log("Document successfully deleted!");
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
  }

    return (
        <div className={`${userU.displayName === user ? 'Umessage' : 'message'}`}>
            <img src={userImage} alt="" />
            <div className="messageInfo">
            <h4>
          {user}{" "}
          <span className="message__timestamp">
            {new Date(timestamp?.toDate()).toUTCString()}
          </span>
          {userU.admin ? (<button onClick={deleteMessage}>Delete Message</button>): (<> </>)}
        </h4>
        <p>{message}</p>
            </div>
        </div>
    )
}

export default Message
