import React, { useEffect, useState } from "react";
// API

// Child Components
import Thumbnail from "../components/Thumbnail/Thumbnail";
import { useAuth } from "../contexts/AuthContext";
import { useWatchlistContext } from "../contexts/WatchlistContext";

const BookmarkedPage = () => {
  const [data, setData] = useState([]);
  const { accountData } = useAuth();
  const { watchlist, getWatchlisted } = useWatchlistContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWatchlisted(accountData.id);
        setData(data);
      } catch (error) {
        console.error("Failed to fetch movies", error);
      }
    };

    fetchData();
  }, [watchlist]);

  return (
    <div className="Movies">
      <h2>My Bookmarks</h2>
      <div className="Thumbnail d-flex flex-row flex-wrap">
        {data &&
          data.map((item, index) => <Thumbnail key={index} item={item} />)}
      </div>
    </div>
  );
};

export default BookmarkedPage;
