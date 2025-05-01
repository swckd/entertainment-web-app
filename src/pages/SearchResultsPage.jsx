import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext";
import { useInView } from "react-intersection-observer";


// API
import TheMovieDatabaseAPI from "../services/TheMovieDatabaseAPI";

// Child Components
import Thumbnail from "../components/Thumbnail/Thumbnail";

const SearchResultsPage = () => {
  const {
    query,
    searchData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status } = useSearch();


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
    <div className="SearchResultsPage">
      <h2>Results for: {query}</h2>
      <div className="Thumbnail d-flex flex-row flex-wrap">
        {searchData &&
          searchData.map((item, index) => <Thumbnail key={index} item={item} />)}
      </div>
      {/* Elemento de referencia para detectar el scroll */}
      {isFetchingNextPage && <p>Loading more...</p>}

      {/* Elemento al final de la lista para detectar el scroll */}
      <div ref={ref} style={{ height: '1px' }}></div>

    </div>
  );
};

export default SearchResultsPage;
