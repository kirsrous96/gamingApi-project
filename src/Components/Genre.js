import axios from '../axios';
import './Genre.css'
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

function Genre({title, fetchUrl}) {
    const user = useSelector(selectUser);
    const [image,setImage] = useState('');
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [gameCount,setGameCount] = useState('');

    useEffect(() =>{
        async function fetchData() {
            const request = await axios.get(fetchUrl);

            let data = request.data.description.replace('<p>','').replace('</p>', '');
            setImage(request.data.image_background);
            setName(request.data.name);
            setDescription(data);
            setGameCount(request.data.games_count);
        }

        fetchData();
    },[fetchUrl]);


    return (
        <div className="genre">
            <h1>{name}</h1>
            <h2>Number of games: {gameCount}</h2>
            {user ? (
                <p>{description}</p>
            ):(
                <Link to="/signup">Please log in to view description</Link>
            )}
            <img src={image} alt="background" />

        </div>
    )
}

export default Genre
