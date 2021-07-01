import React from 'react'
import './SidebarOption.css';
import { db } from "../firebase";
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../Atoms/userState';
import { chatState } from '../Atoms/chatState';

function SidebarOption({owner,title,addChannelOption,id}) {
    const [chat,setChat] = useRecoilState(chatState);
    const user = useRecoilValue(userState);
    const selectChannel = () => {
        if (id) {
          setChat({roomId: id,
            roomOwner: user.displayName})
        }
      };
      const addChannel = () => {
        const channelName = prompt("Please enter channel name");
    
        if (channelName) {
          db.collection("rooms").add({
            name: channelName,
            roomOwner: user.displayName
          });
        }
      };

    return (
        <div className="sidebarOption" onClick={addChannelOption ? addChannel : selectChannel}>
            <h4>{title}</h4>
            {owner ? ( <p>Created by: {owner}</p>) : (<> </>)}
        </div>
    )
}

export default SidebarOption
