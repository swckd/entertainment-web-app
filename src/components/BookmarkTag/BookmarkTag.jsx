// External Libraries
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Styles
import "./BookmarkTag.scss";

// Contexts
import { useWatchlistContext } from "../../contexts/WatchlistContext";
import { useAuth } from "../../contexts/AuthContext";

// Components
import CustomModal from "../CustomModal/CustomModal";

const BookmarkTag = ({ data, item }) => {
  // Contexts
  const {
    watchlist,
    addToWatchlist,
    deleteFromWatchlist,
  } = useWatchlistContext();
  const authState = useAuth();

  // States
  const [showModal, setShowModal] = useState(false);

  // Navigation
  const navigate = useNavigate();

  // Constants
  const isWatchlisted = watchlist.find((element) => element === item.id);

  // Handlers
  const handleToggleWatchlist = () => {
    if (!authState.isLoggedIn) {
      setShowModal(true);
      return;
    }

    if (!isWatchlisted) {
      addToWatchlist(item.media_type, item.id);
    } else {
      deleteFromWatchlist(item.media_type, item.id);
    }
  };

  const handleLoginRedirect = () => {
    setShowModal(false);
    navigate("/login/");
  };

  return (
    <>
      {/* Bookmark Button */}
      <div
        className="BookmarkTag rounded-circle position-absolute top-0 end-0 mt-2 me-2 d-flex justify-content-center align-items-center"
        style={{ width: "32px", height: "32px" }}
        onClick={handleToggleWatchlist}
      >
        <i
          className={`fa-bookmark ${!isWatchlisted ? "fa-regular" : "fa-solid"}`}
        ></i>
      </div>

      {/* Custom Modal */}
      <CustomModal
        title="Log in"
        content="You must be Logged In to add a show to your bookmarks."
        show={showModal}
        onAccept={handleLoginRedirect}
        onDecline={() => setShowModal(false)}
        acceptLabel="Go to Login"
        declineLabel="Cancel"
      />
    </>
  );
};

export default BookmarkTag;