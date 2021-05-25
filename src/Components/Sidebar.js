import React from 'react'
import './Sidebar.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import SidebarOption from './SidebarOption';

function Sidebar() {
    const user = useSelector(selectUser);
    const [channels] = useCollection(db.collection("rooms"));

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <h3>{user?.displayName}</h3>
                <h3>Chats</h3>
            </div>
            <div className="sidebar__channels">
            <SidebarOption addChannelOption title="Add Channel" />
            {channels?.docs.map((doc) => (
                <SidebarOption owner={doc.data().roomOwner} key={doc.id} title={doc.data().name} id={doc.id} />
             ))}
            </div>
        </div>
    )
}

export default Sidebar
