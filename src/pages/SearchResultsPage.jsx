import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// API
import TheMovieDatabaseAPI from '../services/TheMovieDatabaseAPI ';

// Child Components
import Thumbnail from "../components/Thumbnail/Thumbnail";

const SearchResultsPage = () => {

    const location = useLocation();
    const query = location.state && location.state.query;

    const [data, setData] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await TheMovieDatabaseAPI.getSearchData(query);
                setData(data.results);
            } catch (error) {
                console.error('Failed to fetch query', error);
            }
        }
        fetchData();
    }, [query]);

    console.log(data);

    return (
        <div className="SearchResultsPage">
            <h2>Results for: {query}</h2>
            <div className="Thumbnail d-flex flex-row flex-wrap">
                {data && data.map((item, index) => <Thumbnail key={index} item={item} />)}
            </div>
        </div>
    );


};

export default SearchResultsPage;
