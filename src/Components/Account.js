import React, { useEffect, useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/userSlice';
import { auth, db } from '../firebase';
import './Account.css';
import ImageUpload from './ImageUpload';
import firebase from "firebase";


function Account() {
    const user = useSelector(selectUser);
    const userCurrent = firebase.auth().currentUser;
    const [inputValue,setInputValue] = useState([]);
    const [inputPill,setInputPill] = useState(false);
    const [imageChange,setImageChange] = useState(false);
    const [gameSelector,setGameSelector] = useState(false);
    const options = {"Racing": 1,"Shooter": 2,"Adventure": 3,"Action": 4,"Rpg": 5,"Fighting": 6,"Puzzle": 7,"Strategy": 10,"Card": 17,"Casual": 40,"Indie": 51,"Platformer": 83}
    const dispatch = useDispatch();
    const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
    };

    const getKeyByValue = (object, value) => {
        return Object.keys(object).find(key => object[key] === value);
      }
    const handleChange = (e) =>{
        e.preventDefault();
        const targetValue = options[e.target.value];
        db.collection("users").doc(user.uid).collection("favorite").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().favouriteGenres === targetValue){
                    db.collection("users").doc(user.uid).collection("favorite").doc(doc.id).delete()
                }

            });
        });
        db.collection("users").doc(user.uid).collection("favorite").add({
                favouriteGenres:options[e.target.value]
        })
    }
    useEffect(()=>{
        if(user){

            db.collection("users").doc(user.uid).collection("favorite").onSnapshot((snapshot) =>
                setInputValue(
                    snapshot.docs.map((doc) => ({
                      id: doc.id,
                      data: doc.data(),
                    }))
                  )
          );


        };
         
    },[user?.uid]);
    const changeImage = () => {
        if (imageChange) {
            setImageChange(false);
        }else{
            setImageChange(true);
        }
    }
    const deletePill = (inputId) =>{
        const pillColl = db.collection("users").doc(user.uid).collection("favorite").doc(inputId).delete().then(() => {
          console.log("Document successfully deleted!");
      }).catch((error) => {
          console.error("Error removing document: ", error);
      });
      }
    

    return (
        <div className="account">
            {user ? (
                <>
                    <div className="account__user">
                        <img src={user?.photoUrl} alt="No avatar set" />
                        <button onClick={changeImage} className={imageChange ? `account__imageUpload`: ``}>Change Image</button>
                        <div className={imageChange ? ``: `account__imageUpload`}>
                            <ImageUpload username={user} />
                            <button onClick={changeImage} className={imageChange ? ``: `account__imageUpload`}>Exit</button>
                        </div>
                        <button onClick={logoutOfApp}>Log out</button>
                    </div>
                    <div className="account__info">
                        <h1>Email: {user?.email}</h1>
                        <h2>Name: {user?.displayName}</h2>
                        <h3>Favourite games</h3>
                            <div className="account__formControl">
                                <div className={gameSelector ? `selectGame`: ``}>
                                    <select value={inputValue} onChange={handleChange} name="games" id="games" multiple>
                                        <option value="Racing" >Racing</option>
                                        <option value="Shooter" >Shooter</option>
                                        <option value="Adventure" >Adventure</option>
                                        <option value="Action" >Action</option>
                                        <option value="Rpg" >Rpg</option>
                                        <option value="Fighting" >Fighting</option>
                                        <option value="Puzzle" >Puzzle</option>
                                        <option value="Strategy" >Strategy</option>
                                        <option value="Card" >Card</option>
                                        <option value="Casual" >Casual</option>
                                        <option value="Indie" >Indie</option>
                                        <option value="Platformer" >Platformer</option>
                                    </select>

                                    <div className="gamePills">{inputValue.map(input =>(
                                        <>
                                        <p>{getKeyByValue(options,input.data.favouriteGenres)}</p> 
                                        <button onClick={() => deletePill(input.id)}>X</button>
                                        </>
                                    ))}</div>
                                </div>
                            </div>

                    </div>
                </>
            ):(
                <h2>Please login to chat with us</h2>
            )}
        </div>
    )
}

export default Account
