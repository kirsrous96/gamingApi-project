import React, { useState }  from 'react'
import { auth } from '../firebase';
import './Account.css';
import ImageUpload from './ImageUpload';
import { useRecoilState } from 'recoil';
import { userState } from '../Atoms/userState';
import { genreState } from '../Atoms/genreState';


function Account() {
    const [user,setUser] = useRecoilState(userState);
    const [genres,setGenres] = useRecoilState(genreState);
    console.log(genres);
    const [inputValue,setInputValue] = useState([]);
    const [imageChange,setImageChange] = useState(false);
    const [gameSelector,setGameSelector] = useState(false);
    const options = {"Racing": 1,"Shooter": 2,"Adventure": 3,"Action": 4,"Rpg": 5,"Fighting": 6,"Puzzle": 7,"Strategy": 10,"Card": 17,"Casual": 40,"Indie": 51,"Platformer": 83}

    const logoutOfApp = () => {
    setUser(null);
    auth.signOut();
    };

    const getKeyByValue = (object, value) => {
        return Object.keys(object).find(key => object[key] === value);
      }
    const handleChange = (e) =>{
        e.preventDefault();
        const targetValue = options[e.target.value];
        const index = genres.findIndex(x => x.genres==targetValue);
        index === -1 ?  setGenres([...genres, {genres: targetValue}]) : console.log("This item already exists");
    }

    const changeImage = () => {
        if (imageChange) {
            setImageChange(false);
        }else{
            setImageChange(true);
        }
    }
    const deletePill = (genre) =>{
        setGenres(genres.filter(function(el) { return el.genres !== genre }))
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

                                    <div className="gamePills">{genres?.map(genre =>(
                                        <>
                                        <p>{getKeyByValue(options,genre.genres)}</p> 
                                        <button onClick={() => deletePill(genre.genres)}>X</button>
                                        
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
