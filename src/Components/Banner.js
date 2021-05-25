import axios from '../axios';
import './Banner.css';
import React, { useEffect, useState } from 'react'
import requests from '../Requests';

function Banner() {
    const [action,setAction] = useState('');

    useEffect(() => {
        async function fetchData() {
          const request = await axios.get(requests.fetchFighting);
          setAction(request.data.image_background);
          return request;
        }
    
        fetchData();
      }, []);
      
    return (
        <div className="banner">
            <img src={action} alt="banner" />
        </div>
    )
}

export default Banner