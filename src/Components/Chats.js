import React from 'react'
import './Chats.css';
import Sidebar from './Sidebar'
import Chat from "./Chat";
import { useRecoilValue } from 'recoil';
import { userState } from '../Atoms/userState';

function Chats() {
    const user = useRecoilValue(userState);
    return (
        <div className="chats">
            {user ? (
                <div className="chatBody">
                <Sidebar />
                <Chat />
                </div>
            ):(
                <h2>You have not logged in.Please login to chat with us.</h2>
            )}
            
        </div>
    )
}

export default Chats
