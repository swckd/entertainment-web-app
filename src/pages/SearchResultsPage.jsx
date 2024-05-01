import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// API
import TheMovieDatabaseAPI from "../services/TheMovieDatabaseAPI";

// Child Components
import Thumbnail from "../components/Thumbnail/Thumbnail";

const SearchResultsPage = () => {
  const location = useLocation();
  const query = location.state && location.state.query;

  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await TheMovieDatabaseAPI.getSearchData(
          query,
          currentPage
        );
        setData(data.results);
      } catch (error) {
        console.error("Failed to fetch query", error);
      }
    };
    fetchData();
  }, [query, currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="SearchResultsPage">
      <h2>Results for: {query}</h2>
      <div className="Thumbnail d-flex flex-row flex-wrap">
        {data &&
          data.map((item, index) => <Thumbnail key={index} item={item} />)}
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

export default SearchResultsPage;
