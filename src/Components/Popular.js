import axios from '../axios';
import React, { useEffect, useState } from 'react'
import requests from '../Requests';
import Trailer from './Trailer';
import './Popular.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

function Popular() {
    const [names,setNames] = useState([]);
    const user = useSelector(selectUser);


    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchGames);
            setNames(request.data.results);
            return request;
        }
    
        fetchData();
      }, []);


    return (
        <div className="popular">
            {user ? (
                <>
                <h1>Most Popular Games</h1>
            <h3>Click on your favourite game to find out if it has a trailer</h3>
            <div className="games">
                {names.map(item =><Trailer name={item.name} key={item.id} id={item.id} />)}
            </div>
            </>  
            ):
            (
                <h2>Please login to see our popular games</h2>
            )}
            
        </div>
    )
}

export default Popular;