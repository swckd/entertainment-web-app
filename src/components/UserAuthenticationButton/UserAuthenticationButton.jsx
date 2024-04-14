import React, { useEffect, useState } from "react";
//CSS
import "./UserAuthenticationButton.scss";
//Images
import avatar from "../../assets/image-avatar.png";
// import TheMovieDatabaseAPI from "../../services/TheMovieDatabaseAPI ";



const UserAuthenticationButton = () => {

  // const [guestSessionId, setguestSessionId] = useState(null);

  // useEffect(()=> {
  //   const fetchData = async () => {
  //     try {
  //       const guestSessionId = await TheMovieDatabaseAPI.createGuestSession();
  //       setguestSessionId(guestSessionId.guest_session_id);
  //     } catch (error) {
  //       console.error('Failed to create Guest Session', error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  // console.log(guestSessionId);

  return (
    <div className="UserAuthenticationButton">
      <img
        src={avatar}
        className="avatar-img rounded-circle"
        alt="User profile pic"
      />
    </div>
)};



export default UserAuthenticationButton;
