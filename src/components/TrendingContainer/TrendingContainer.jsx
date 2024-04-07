import React, { useEffect, useState } from 'react';
// API
import TheMovieDatabaseAPI from '../../services/TheMovieDatabaseAPI ';
// SCSS
import './TrendingContainer.scss';
// Child Components
import Thumbnail from "../Thumbnail/Thumbnail";


const TrendingContainer = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await TheMovieDatabaseAPI.getTrendingData();
        setData(data.results);
        console.log(data);
      } catch (error) {
        throw error;
      }
    }
    fetchData();
  }, []);


  return (

    <div className="TrendingContainer">
      <h2>Trending</h2>
      <div className="Thumbnail d-flex flex-row flex-wrap">
        {data && data.map((movie, index) => (
          <Thumbnail key={index} item={movie} />
        ))}
      </div>
    </div>

  );

};

export default TrendingContainer;
