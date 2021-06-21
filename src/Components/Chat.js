import React, { useEffect, useRef } from "react";
import { db } from "../firebase";
import './Chat.css';
import Message from "./Message";
import ChatInput from "./ChatInput";
import { useCollection } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/chatSlice";

function Chat() {
    const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useCollection(
    roomId && db.collection("rooms").doc(roomId)
  );
  const [roomMessages, roomLoading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView();
  }, [roomId, roomLoading]);


    return (
        <div className="chat">
            <div className="chatHeader">
                <div className="chat__headerLeft">
                    <h4><strong>#{roomDetails?.data().name}</strong></h4>
                </div>
            </div>

            <div className="chat__messages">
            {roomMessages?.docs.map((doc) => {
              const { message, timestamp, user, userImage,channelId } = doc.data();
              const id = doc.id
              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                  channelId={channelId}
                  messageId={id}
                />
              );
            })}
            <div ref={chatRef} className="chatBottom">
            </div>
            </div>
            <ChatInput
            chatRef={chatRef}
            channelName={roomDetails?.data().name}
            channelId={roomId}
          />
        </div>
    )
}

export default Chat
