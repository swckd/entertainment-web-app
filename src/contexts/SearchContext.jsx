import React, { createContext, useContext, useState } from "react";
import TheMovieDatabaseAPI from "../services/TheMovieDatabaseAPI";
import { useInfiniteQuery } from "@tanstack/react-query";


const SearchContext = createContext();



export const SearchProvider = ({ children }) => {

    const [query, setQuery] = useState("");
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
        queryKey: ['searchData'],
        queryFn: ({ pageParam }) => TheMovieDatabaseAPI.getSearchData(query, pageParam),
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
    const searchState = {
        query,
        setQuery,
        searchData: data?.pages.flatMap(page => page.results) || [],
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status
    }

    return (
        <SearchContext.Provider value={searchState} >
            {children}
        </SearchContext.Provider >
    );

}

export const useSearch = () => {
    return useContext(SearchContext)
}