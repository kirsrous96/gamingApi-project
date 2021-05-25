import React  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/userSlice';
import { auth } from '../firebase';
import './Account.css';


function Account() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
    };

    return (
        <div className="account">
            {user ? (
                <>
                    <div className="account__user">
                        <img src={user?.photoUrl} alt="No avatar set" />
                        <h3>{user?.email}</h3>
                        <button onClick={logoutOfApp}>Log out</button>
                    </div>
                    <div className="account__info">
                        
                        <p>Name: {user?.displayName}</p>
                        <p>Id: {user.uid}</p>
                    </div>
                </>
            ):(
                <h2>Please login to chat with us</h2>
            )}
        </div>
    )
}

export default Account
