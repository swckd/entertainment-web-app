import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//CSS
import "./UserAuthenticationButton.scss";
//Images
// import avatarImg from "../../assets/image-avatar.png";
// import avatarImg from "../../assets/placeholder.jpg";

// Context API
import { useAuth } from "../../contexts/AuthContext";

// Bootstrap React
import { Tooltip, OverlayTrigger } from "react-bootstrap";

const UserAuthenticationButton = () => {
  const { accountData, avatar } = useAuth();

  // const [avatar, setAvatar] = useState(avatarImg);

  // useEffect(() => {
  //   if (accountData) {
  //     setAvatar(
  //       `https://www.gravatar.com/avatar/${accountData.avatar.gravatar.hash}`
  //     );
  //   } else {
  //     setAvatar(avatar);
  //   }
  // }, [accountData, avatar]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {accountData ? `Logged-in as ${accountData.username}` : "Click to log-in"}
    </Tooltip>
  );

  return (
    <div className="UserAuthenticationButton">
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <Link to="/user-dashboard/">
          <img
            src={avatar}
            className="avatar-img rounded-circle"
            alt="User profile pic"
          />
        </Link>
      </OverlayTrigger>
    </div>
  );
};

export default UserAuthenticationButton;
