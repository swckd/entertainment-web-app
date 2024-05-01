import React, { useEffect, useState } from "react";

// API
import TheMovieDatabaseAPI from "../services/TheMovieDatabaseAPI";

// Child Components
import Thumbnail from "../components/Thumbnail/Thumbnail";

const MoviesPage = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await TheMovieDatabaseAPI.getMoviesData(currentPage);
        setData(data.results);
      } catch (error) {
        console.error("Failed to fetch movies", error);
      }
    };
    fetchData();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="Movies">
      <h2>Movies</h2>
      <div className="Thumbnail d-flex flex-row flex-wrap justify-content-center">
        {data &&
          data.map((movie, index) => (
            <Thumbnail key={index} item={movie} parent="Movies" />
          ))}
      </div>
      <div className="mb-5">
        <button onClick={handlePreviousPage} className="btn btn-danger">
          Previous
        </button>
        <span className="mx-2">{currentPage}</span>
        <button onClick={handleNextPage} className="btn btn-danger ms-1">
          Next
        </button>
      </div>
    </div>
  );
};

export default MoviesPage;
