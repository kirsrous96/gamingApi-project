import React, { useEffect, useRef, useState } from 'react'
import './Home.css';
import Genre from './Genre';
import axios from '../axios';
import { useRecoilValue } from 'recoil';
import { userState } from '../Atoms/userState';
import { genreState } from '../Atoms/genreState';

function Home() {
    const defaultList = [1,2,3,4,5,6,7,10,17,40,51,83];
    let genreStates = useRecoilValue(genreState);
    const user = useRecoilValue(userState);
    const [genres,setGenres] = useState([]);
    const [choice,setChoice] = useState("");
    const [zanri,setZanri] = useState([]);
    const [sortBy,setSortBy] = useState("");
    let newList = [];
    
    useEffect(()=>{
        if(user){
            if (genreStates.length > 0){
                genreStates.map(genre =>{
                    
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
        }
    },[genreStates]);
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


    const sortById =  (a,b) =>a.id > b.id ? 1: -1
    const sortByTitle =  (a,b) =>
        a.slug > b.slug ? 1: -1
    const sortByCount =  (a,b) =>
        a.games_count> b.games_count ? 1: -1;

    function sorting(){
        let sorted;
        if(sortBy === 'title'){
            sorted = sortByTitle
           }else if (sortBy === 'id'){
            sorted = sortById
           }else{
            sorted = sortByCount
           }
           console.log(sorted);
           return sorted
    }

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
                <div className="genre__listItems">
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
            <form>
                    <p> Sort by: </p>
                    <select value={sortBy} onChange={e=>setSortBy(e.target.value)} name="genres" id="genres">
                        <option value="title">Title</option>
                        <option value="gameCount">Game Count</option>
                        <option value="id">Id</option>
                    </select>
                </form>
            </div>
            <div className="genres">
                {zanri.sort(sorting()).map(zanr =>(
                    <Genre key={zanri.id} title={zanr.name} description={zanr.description} image={zanr.image_background} gameCount={zanr.games_count} />
                ))}

            </div>
        </div>
    )
}

export default Home
