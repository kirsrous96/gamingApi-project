import React, { useState } from 'react'
import './Signup.css';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import { auth,provider } from '../firebase';
import { useHistory } from 'react-router';


function Admin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();
    const [sign,setSign] = useState(true);

  const loginToApp = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            profileUrl: userAuth.user.photoURL,
            admin: true,
          })
        );
        history.push('/');
      })
      .catch((error) => setError(error.message));
      
  };

  const changeSign = () =>{
    if (sign) {
      setSign(false);
    }else{
      setSign(true);
    }
  } 
  const register = (e) => {
    e.preventDefault();
    if (!error){
      auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
            photoURL: profilePic,
          })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoUrl: profilePic,
                admin: true
              })
            );
          });
          history.push('/');
      })
      .catch((error) => setError(error.message));
    }
  };

    return (
        <div className="login">
      <img
        src="https://images.squarespace-cdn.com/content/v1/526ece1ce4b096af9720f686/1546401450582-0D1Q47B63XLABIC0YGDT/ke17ZwdGBToddI8pDm48kMtiXMEMZ8ID8MVhA-T_Qc9Zw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIXpy3a2Cibo6eml5BpILeGX-BY3QvcZT7F317PmmzovI/GNI-color.png"
        alt=""
      />

      <form>
        {sign && (
        <>
        <p  className="errorText">{error}</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Admin name"
          type="text"
        />
        <input
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
          placeholder="Profile pic URL (optional)"
          type="text"
        />
        </>)}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Admin Email"
          type="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin Password"
          type="password"
        />
        <button type="submit" onClick={sign ? register  : loginToApp}>
          {sign ? (<>Register Now</>): (<>Sign In</>)}
        </button>
      </form>

      <p>
        {sign ? (<>Already created?{" "}</>) : (<>Admin not created?{" "}</>)}
        <span className="login__register" onClick={changeSign}>
          {sign ? (<>Sign In as Admin</>): (<p>Register a Admin</p>)}
        </span>
      </p>

    </div>
    )
}

export default Admin