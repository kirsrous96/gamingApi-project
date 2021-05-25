import './Trailer.css';
import axios from 'axios';
import { useState } from 'react';
import {API_KEY} from '../Requests';

function Trailer({name, id}) {

    const gameURL = `https://api.rawg.io/api/games/${id}/movies?key=${API_KEY}`
    const [video,setVideo] = useState('');
    const [setter,setSetter] = useState(false);

    async function fetchData() {
        const request = await axios.get(gameURL);
        
        if(request.data.results[0]){
            setVideo(request.data.results[0].data["480"]);
            setSetter(true);
        }else{
            setVideo('');
        }
        return request;
    }

    const getTrailer = () =>{
        fetchData();
    }
    const closeTrailer = () =>{
        if (video && setter){
            setVideo('')
            setSetter(false);
        }else{
            setSetter(true);
        }
    }

    return (
        <div className={`game ${setter ? 'active': 'inactive'}`}>
            <p onClick={getTrailer}>{name}</p>
            {video && (
                <>
                <video width="720" height="480" controls>
                <source src={video} type="video/mp4" />
                </video>
                <button onClick={closeTrailer}>Close Window</button>
                </>
            )}
        </div>
    )
}

export default Trailer
