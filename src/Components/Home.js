import React from 'react'
import './Home.css';
import requests from '../Requests';
import Genre from './Genre';


function Home() {
    return (
        <div className="home">
            <h1>Game genres</h1>
            <div className="genres">
                <Genre title="Action" fetchUrl={requests.fetchAction} />
                <Genre title="Shooter" fetchUrl={requests.fetchShooter} />
                <Genre title="Adventure" fetchUrl={requests.fetchAdventure} />
                <Genre title="Rpg" fetchUrl={requests.fetchRPG} />
                <Genre title="Fighting" fetchUrl={requests.fetchFighting} />
                <Genre title="Puzzle" fetchUrl={requests.fetchPuzzle} />
                <Genre title="Racing" fetchUrl={requests.fetchRacing} />
                <Genre title="Strategy" fetchUrl={requests.fetchStrategy} />
                <Genre title="Platformer" fetchUrl={requests.fetchPlatformer} />
                <Genre title="Card" fetchUrl={requests.fetchCard} />
                <Genre title="Indie" fetchUrl={requests.fetchIndie} />
                <Genre title="Casual" fetchUrl={requests.fetchCasual} />
            </div>
        </div>
    )
}

export default Home
