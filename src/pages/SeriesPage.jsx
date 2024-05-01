import React, { useEffect, useState } from "react";

// API
import TheMovieDatabaseAPI from "../services/TheMovieDatabaseAPI";

// Child Components
import Thumbnail from "../components/Thumbnail/Thumbnail";

const SeriesPage = () => {
  const [data, setData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await TheMovieDatabaseAPI.getSeriesData(currentPage);
        setData(data);
      } catch (error) {
        console.error("Failed to fetch series", error);
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
    <div className="Series">
      <h2>Series</h2>
      <div className="Thumbnail d-flex flex-row flex-wrap justify-content-center">
        {data &&
          data.map((serie, index) => (
            <Thumbnail key={index} item={serie} parent="TV" />
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

export default SeriesPage;
