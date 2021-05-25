import React from 'react'
import './Chats.css';
import Sidebar from './Sidebar'
import Chat from "./Chat";
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

function Chats() {
    const user = useSelector(selectUser);
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
