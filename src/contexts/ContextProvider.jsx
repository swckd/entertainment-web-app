import React from "react";

import AuthProvider from "./AuthContext"
import WatchlistProvider from "./WatchlistContext"
import { TrendingProvider } from "./TrendingContext";
import { MoviesProvider } from "./MoviesContext";
import { SeriesProvider } from "./SeriesContext";
import { SearchProvider } from "./SearchContext";


// functional component that takes children as a prop
const ContextProvider = ({ children }) => {
    return (
        <AuthProvider>
            <WatchlistProvider>
                <TrendingProvider>
                    <MoviesProvider>
                        <SeriesProvider>
                            <SearchProvider>
                                {children}
                            </SearchProvider>
                        </SeriesProvider>
                    </MoviesProvider>
                </TrendingProvider>
            </WatchlistProvider>
        </AuthProvider>
    )
}

export default ContextProvider;