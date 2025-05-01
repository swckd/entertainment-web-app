import React, { useEffect, useState } from "react";
import { useSeries } from "../contexts/SeriesContext";
import { useInView } from "react-intersection-observer";

// Child Components
import Thumbnail from "../components/Thumbnail/Thumbnail";

const SeriesPage = () => {
  const {
    seriesData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status } = useSeries();


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
    <div className="Series">
      <h2>Series</h2>
      <div className="Thumbnail d-flex flex-row flex-wrap justify-content-center">
        {seriesData &&
          seriesData.map((serie, index) => (
            <Thumbnail key={index} item={serie} parent="TV" />
          ))}
      </div>


      {/* Elemento de referencia para detectar el scroll */}
      {isFetchingNextPage && <p>Loading more...</p>}

      {/* Elemento al final de la lista para detectar el scroll */}
      <div ref={ref} style={{ height: '1px' }}></div>

    </div>
  );
};

export default SeriesPage;
