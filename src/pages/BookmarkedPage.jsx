// External libraries
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


// Components

import Thumbnail from "../components/Thumbnail/Thumbnail";
import { useAuth } from "../contexts/AuthContext";
import { useWatchlistContext } from "../contexts/WatchlistContext";
import CustomModal from "../components/CustomModal/CustomModal";

const BookmarkedPage = () => {
  const [data, setData] = useState([]);

  // States

  const { accountData } = useAuth();
  const { watchlist, getWatchlisted } = useWatchlistContext();
  const [showModal, setShowModal] = useState(false)

  // Navigation
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWatchlisted(accountData.id);
        setData(data);

      } catch (error) {
        setShowModal(true)
        console.error("Failed to fetch movies", error);
      }
    };

    fetchData();
  }, [watchlist]);

  // Handlers
  const handleLoginRedirect = () => {
    setShowModal(false);
    navigate("/login/");
  };

  const handleDeclineRedirect = () => {
    setShowModal(false);
    navigate("/");
  };




  return (
    <>
      <div className="Movies">
        <h2>My Bookmarks</h2>
        <div className="Thumbnail d-flex flex-row flex-wrap">
          {data && data.length > 0 ? (data.map((item, index) => <Thumbnail key={index} item={item} />))

            :
            (<p>No bookmarks found. Start adding some!</p>)}
        </div>
      </div>
      {/* Custom Modal */}
      <CustomModal
        title="Log in"
        content="You must be Logged In to add a show to your bookmarks."
        show={showModal}
        onAccept={handleLoginRedirect}
        onDecline={handleDeclineRedirect}
        acceptLabel="Go to Login"
        declineLabel="Cancel"
      />
    </>

  );
};

export default BookmarkedPage;
