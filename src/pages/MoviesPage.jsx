import React, { useEffect, useState } from 'react';

// API
import TheMovieDatabaseAPI from '../services/TheMovieDatabaseAPI';

// Child Components
import Thumbnail from "../components/Thumbnail/Thumbnail";

const MoviesPage = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await TheMovieDatabaseAPI.getMoviesData();
                setData(data.results);
                
            } catch (error) {
                console.error('Failed to fetch movies', error);
            }
        }
        fetchData();
    }, []);



    return (
        <div className="Movies">
            <h2>Movies</h2>
            <div className="Thumbnail d-flex flex-row flex-wrap">
            {data && data.map((movie, index) => (
                <Thumbnail key={index} item={movie} parent="Movies" />
            ))}
            </div>
        </div>
    );


};

export default MoviesPage;
