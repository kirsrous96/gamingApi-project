import './Genre.css'
import React from 'react';
import {Link} from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../Atoms/userState';

function Genre({title,description,image,gameCount}) {
    const user = useRecoilValue(userState);
    const descriptionValue = description;
    const newDescription = descriptionValue.replace('<p>','').replace('</p>', '');

    return (
        <div className="genre">
            <h1>{title}</h1>
            <h1>Number of games: {gameCount}</h1>
            {user ? (
                <p>{newDescription}</p>
            ):(
                <Link to="/signup">Please log in to view description</Link>
            )}
            <img src={image} alt="background" />

        </div>
    )
}

export default Genre
