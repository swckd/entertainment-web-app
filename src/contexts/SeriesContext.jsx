import React, { createContext, useContext } from "react";
import TheMovieDatabaseAPI from "../services/TheMovieDatabaseAPI";
import { useInfiniteQuery } from "@tanstack/react-query";

const SeriesContext = createContext();

export const SeriesProvider = ({ children }) => {

    // Usar TanStack Query para obtener los datos

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ['seriesData'],
        queryFn: ({ pageParam }) => TheMovieDatabaseAPI.getSeriesData(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.total_pages) {
                return lastPage.page + 1;
            } else {
                return undefined;
            }
        },
    })

    // Poveer elestado a travésdelcontexto
    const seriesState = {
        seriesData: data?.pages.flatMap(page => page.results) || [],
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status
    }

    return (
        <SeriesContext.Provider value={seriesState} >
            {children}
        </SeriesContext.Provider >
    );

}

export const useSeries = () => {
    return useContext(SeriesContext)
}

