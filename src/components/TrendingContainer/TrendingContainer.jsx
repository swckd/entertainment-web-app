import React, { useEffect, useState } from "react";

// API
import TheMovieDatabaseAPI from "../../services/TheMovieDatabaseAPI";
// SCSS
import "./TrendingContainer.scss";
// Child Components
import Thumbnail from "../Thumbnail/Thumbnail";
import { useTrending } from "../../contexts/TrendingContext";
import { useInView } from "react-intersection-observer";


const TrendingContainer = () => {
  const {
    trendingData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status } = useTrending();


  const { ref, inView } = useInView();

  // Detecta si el usuario ha llegado al final y carga más datos automáticamente
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === 'pending') return <p>Loading trending data...</p>;
  if (status === 'error') return <p>Error loading trending data: {error.message}</p>;


  return (
    <div className="TrendingContainer">
      <h2>Trending</h2>
      <div className="Thumbnail d-flex flex-row flex-wrap">
        {trendingData.length > 0 ? (
          trendingData.map((movie, index) => (
            <Thumbnail key={index} item={movie} />
          ))
        ) : (
          <p>No trending data available.</p>
        )}
      </div>

      {/* Elemento de referencia para detectar el scroll */}
      {isFetchingNextPage && <p>Loading more...</p>}

      {/* Elemento al final de la lista para detectar el scroll */}
      <div ref={ref} style={{ height: '1px' }}></div>
    </div>


  );
};

export default TrendingContainer;
