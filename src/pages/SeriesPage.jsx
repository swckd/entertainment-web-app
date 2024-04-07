import React, { useEffect, useState } from 'react';

// API
import TheMovieDatabaseAPI from '../services/TheMovieDatabaseAPI ';

// Child Components
import Thumbnail from "../components/Thumbnail/Thumbnail";

const SeriesPage = () => {

    const [data, setData] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await TheMovieDatabaseAPI.getSeriesData();
                setData(data.results);
                     } catch (error) {
                console.error('Failed to fetch series', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="Series">
            <h2>Series</h2>
            <div className="Thumbnail d-flex flex-row flex-wrap">
                {data && data.map((serie, index) => <Thumbnail key={index} item={serie} parent="TV" />)}
            </div>
        </div>
    );


};

export default SeriesPage;
