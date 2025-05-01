import React, { useEffect, useRef } from "react";
import { useMovies } from "../contexts/MoviesContext";
import { useInView } from "react-intersection-observer";
import { useLocation } from "react-router-dom";

// Child Components
import Thumbnail from "../components/Thumbnail/Thumbnail";

const MoviesPage = () => {
  const {
    moviesData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status } = useMovies();


  const { ref, inView } = useInView();
  const location = useLocation(); // Get the current location
  const moviesRef = useRef(null); // Create a ref for the "movies" section
  // Detecta si el usuario ha llegado al final y carga más datos automáticamente
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (moviesRef.current) {
      moviesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  if (status === 'pending') return <p>Loading trending data...</p>;
  if (status === 'error') return <p>Error loading trending data: {error.message}</p>;

  return (
    <div className="Movies" id="movies">
      <h2>Movies</h2>
      <div className="Thumbnail d-flex flex-row flex-wrap justify-content-center">
        {moviesData &&
          moviesData.map((movie, index) => (
            <Thumbnail key={index} item={movie} parent="Movies" />
          ))}
      </div>

      {/* Elemento de referencia para detectar el scroll */}
      {isFetchingNextPage && <p>Loading more...</p>}

      {/* Elemento al final de la lista para detectar el scroll */}
      <div ref={ref} style={{ height: '1px' }}></div>
    </div>
  );
};

export default MoviesPage;
