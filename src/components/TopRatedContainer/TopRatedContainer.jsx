import React, { useEffect, useState, useRef } from 'react';
// API
import TheMovieDatabaseAPI from '../../services/TheMovieDatabaseAPI';
// SCSS
import './TopRatedContainer.scss';
// Child Components
import ThumbnailTopRated from "../ThumbnailTopRated/ThumbnailTopRated";

// Custom Hooks
import useDragToScroll from '../../hooks/useDragToScroll';

const TopRatedContainer = () => {
  const [data, setData] = useState(null);
  const ref = useRef();

  useDragToScroll(ref);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await TheMovieDatabaseAPI.getTopRatedData();
        setData(data);
      } catch (error) {
        throw error;
      }
    }
    fetchData();
  }, []);


  return (
    <div>
      <div className="TopRatedContainer">
        <h2>Top Rated</h2>
      </div>
      <div ref={ref} className="ThumbnailTopRated d-flex flex-row">
        {data && data.map((item, index) => <ThumbnailTopRated key={index} item={item} />)}
      </div>
    </div>
  );
};

export default TopRatedContainer;