import { createContext, useContext, useEffect, useState } from "react";
import TheMovieDatabaseAPI from "../services/TheMovieDatabaseAPI";
import { useAuth } from "./AuthContext";

const WatchlisContext = createContext();

const WatchlistProvider = ({ children }) => {
  const { accountData } = useAuth();

  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (accountData) {
      getWatchlistItems();
    }
  }, [accountData]);


  const getWatchlistItems = async () => {
    try {
      const watchlistItems = await TheMovieDatabaseAPI.getWatchlistItems(
        accountData.id
      );
      setWatchlist(watchlistItems);
    } catch (error) {
      console.error("Failed to fetch watchlist items", error);
    }
  };

  const getWatchlisted = async () => {
    try {
      const watchlisted = await TheMovieDatabaseAPI.getWatchlisted(
        accountData.id
      );
      return watchlisted;
    } catch (error) {
      console.error("Failed to fetch watchlist items", error);
    }
  };

  const addToWatchlist = async (media_type, media_id) => {
    try {
      const data = await TheMovieDatabaseAPI.addToWatchlist(
        accountData.id,
        media_type,
        media_id,
        setWatchlist
      );
      updateWatchlist();
      return data;
    } catch (error) {
      console.error("Failed to add to watchlist", error);
    }
  };

  const deleteFromWatchlist = async (media_type, media_id) => {
    try {
      const data = await TheMovieDatabaseAPI.deleteFromWatchlist(
        accountData.id,
        media_type,
        media_id,
        setWatchlist
      );
      updateWatchlist();

      return data;
    } catch (error) {
      console.error("Failed to add to watchlist", error);
    }
  };

  const updateWatchlist = async () => {
    try {
      await getWatchlistItems();
    } catch (error) {
      console.error("Failed to update watchlist", error);
    }
  };

  const WatchlistState = {
    watchlist,
    setWatchlist,
    addToWatchlist,
    deleteFromWatchlist,
    updateWatchlist,
    getWatchlisted,
  };

  return (
    <WatchlisContext.Provider value={WatchlistState}>
      {children}
    </WatchlisContext.Provider>
  );
};

export default WatchlistProvider;

// Custom Hook
export const useWatchlistContext = () => {
  return useContext(WatchlisContext);
};
