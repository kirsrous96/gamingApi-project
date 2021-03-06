import React, { useState } from "react";
import './ChatInput.css'
import { db } from "../firebase";
import firebase from "firebase";
import { useRecoilValue } from "recoil";
import { userState } from "../Atoms/userState";

function ChatInput({ channelName, channelId, chatRef }) {
    const [input, setInput] = useState("");
    const user = useRecoilValue(userState);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }

    db.collection("rooms").doc(channelId).collection("messages").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.displayName,
      userId: user.uid,
      userImage: user.photoUrl,
      channelId: channelId
    });

    chatRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
    setInput("");
  };


    return (
        <div className="chatInput">
            <form>
                <input
                placeholder={`Message #${channelName?.toLowerCase()}`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                />
                <button hidden type="submit" onClick={sendMessage}>
                SEND
                </button>
            </form>
        </div>
    )
}

export default ChatInput
