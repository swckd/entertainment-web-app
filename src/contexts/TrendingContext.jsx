import { createContext, useContext } from "react";
import TheMovieDatabaseAPI from "../services/TheMovieDatabaseAPI";
import { useInfiniteQuery } from "@tanstack/react-query"; // Importar useQuery

// 1. Crear el Contexto
const TrendingContext = createContext()

// 2. Proveedor del Contexto
export const TrendingProvider = ({ children }) => {


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
        queryKey: ['trendingData'],
        queryFn: ({ pageParam }) => TheMovieDatabaseAPI.getTrendingData(pageParam),
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
    const trendingState = {
        trendingData: data?.pages.flatMap(page => page.results) || [],
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status
    }

    return (
        <TrendingContext.Provider value={trendingState}>
            {children}
        </TrendingContext.Provider>
    )
}
// 3. Hook personalizado para usar el contexto


export const useTrending = () => {
    return useContext(TrendingContext);
};