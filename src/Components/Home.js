import React, { useEffect, useState } from 'react'
import './Home.css';
import Genre from './Genre';
import axios from '../axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { selectGenres } from '../features/genreSlice';

function Home() {
    const defaultList = [1,2,3,4,5,6,7,10,17,40,51,83];
    let genreState = useSelector(selectGenres);
    const user = useSelector(selectUser);
    const [genres,setGenres] = useState([]);
    const [choice,setChoice] = useState("");
    const [zanri,setZanri] = useState([]);
    let newList = [];
    useEffect(()=>{
        if(user){
            if (genreState.length > 0){
                genreState.map(genre =>{
                    
                    const genreValue = genre.genres;
                    genres.push(genreValue);
                })
                Promise.all(genres.map((genre) =>{
                    const genrePromise = (axios.get(`/genres/${genre}?key=${process.env.REACT_APP_API_KEY}`).then(values =>
                        {
                            newList = [...newList,values.data];

                            setZanri(newList);
                        })) ;
                        
                }));
            }
        }else{
        }
    },[genreState]);
    useEffect(() =>{
        let list = [];
        Promise.all(genres.map((genre) =>{
            axios.get(`/genres/${genre}?key=${process.env.REACT_APP_API_KEY}`).then(values =>
            {
                list = [...list,values.data];
                setZanri(list); 
            }) ; 
    }))
    },[genres])

    function listAllGenres() {
        setGenres(defaultList);
    };

    const formControl =(e) =>{
        e.preventDefault();
        setGenres([]);
        setZanri([]);
        if(choice){
            const genreString = choice.split(',');
            const newChoice = genres.concat(genreString);
            setGenres(newChoice); 
                setChoice('');
        }
    }

    return (
        <div className="home">
            <h1>Game genres</h1>
            <div className="home__genres">
                <div className="home__form">
                    <button onClick={listAllGenres}>Get all game genres</button>
                    <form>
                        <input type="text" value={choice}
                        onChange={(e) => setChoice(e.target.value)} placeholder="Add which genres you want to see" />
                        <button onClick={formControl}>Get your selected genres</button>
                    </form>
                </div>
                <div className="genre__list">
                <h2>Genre List</h2>
                <p>1: Racing</p>
              <p>2:Shooter</p>
               <p>3:Adventure</p>
               <p>4:Action</p>
               <p>5:Rpg</p>
               <p>6:Fighting</p>
               <p>7:Puzzle</p>
               <p>10:Strategy</p>
               <p>17:Card</p>
               <p>40:Casual</p>
               <p>51:Indie</p>
               <p>83:Platformer</p>
            </div>
            </div>
            <div className="genres">
                {zanri.map(zanr =>(
                    <Genre key={zanri.id} title={zanr.name} description={zanr.description} image={zanr.image_background} gameCount={zanr.games_count} />
                ))}

            </div>
        </div>
    )
}

export default Home
