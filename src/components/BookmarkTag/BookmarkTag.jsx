import React from "react";
import "./BookmarkTag.scss";

// Context API
import { useWatchlistContext } from "../../contexts/WatchlistContext";

const BookmarkTag = ({ data, item }) => {
  const {
    watchlist,
    setWatchlist,
    addToWatchlist,
    deleteFromWatchlist,
    updateWatchlist,
  } = useWatchlistContext();

  const isWatchlisted = watchlist.find((element) => element === item.id);

  const handleToggleWatchlist = () => {
    if (!isWatchlisted) {
      addToWatchlist(item.media_type, item.id);
    } else {
      deleteFromWatchlist(item.media_type, item.id);
    }
  };

  return (
    <div
      className="BookmarkTag rounded-circle position-absolute top-0 end-0 mt-2 me-2 d-flex
      justify-content-center align-items-center"
      style={{ width: "32px", height: "32px" }}
      onClick={handleToggleWatchlist}
    >
      <i
        className={`fa-bookmark ${!isWatchlisted ? "fa-regular" : "fa-solid"}`}
      ></i>
    </div>
  );
};

export default BookmarkTag;
