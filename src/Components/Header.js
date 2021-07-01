import React from 'react'
import './Header.css'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { selectUser } from '../features/userSlice';
import { useRecoilValue } from 'recoil';
import { userState } from '../Atoms/userState';


function Header() {
    const user = useRecoilValue(userState);

    return (
        <div className="header">
            <div className="header__left">
                <Link to="/"><img src="https://images.squarespace-cdn.com/content/v1/526ece1ce4b096af9720f686/1546401450582-0D1Q47B63XLABIC0YGDT/ke17ZwdGBToddI8pDm48kMtiXMEMZ8ID8MVhA-T_Qc9Zw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIXpy3a2Cibo6eml5BpILeGX-BY3QvcZT7F317PmmzovI/GNI-color.png" alt="Logo" /></Link>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/popular">Popular</Link></li>
                    <li><Link to="/chat">Chat with Us</Link></li>
                </ul>
            </div>
            <div className="header__right">
                <ul>
                    {user ? (
                        <>
                        <li>{user?.displayName}</li>
                        <li><Link to="/account">Account</Link></li>
                        </>
                    ):(
                        <li><Link className="header__rightSignup" to="/signup">Sign Up</Link></li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Header
