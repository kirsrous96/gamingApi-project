import React from 'react'
import './SidebarOption.css';
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { enterRoom } from "../features/chatSlice";
import { selectUser } from '../features/userSlice';

function SidebarOption({owner,title,addChannelOption,id}) {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const selectChannel = () => {
        if (id) {
          dispatch(
            enterRoom({
              roomId: id,
              roomOwner: user.displayName
            })
          );
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
