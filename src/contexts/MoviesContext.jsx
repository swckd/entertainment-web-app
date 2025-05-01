import React, { createContext, useContext } from "react";
import TheMovieDatabaseAPI from "../services/TheMovieDatabaseAPI";
import { useInfiniteQuery } from "@tanstack/react-query";

// Create a context

const MoviesContext = createContext();

// Context Provider

export const MoviesProvider = ({ children }) => {

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
        queryKey: ['moviesData'],
        queryFn: ({ pageParam }) => TheMovieDatabaseAPI.getMoviesData(pageParam),
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
    const moviesState = {
        moviesData: data?.pages.flatMap(page => page.results) || [],
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status
    }

    return (
        <MoviesContext.Provider value={moviesState} >
            {children}
        </MoviesContext.Provider >
    );
}

export const useMovies = () => {
    return useContext(MoviesContext)
}