import React from "react";
import { Link } from "react-router-dom";
// CSS
import "./Aside.scss";
// Images
import logo from "../../assets/logo.svg";
import iconnavhome from "../../assets/icon-nav-home.svg";
import iconnavmovies from "../../assets/icon-nav-movies.svg";
import iconnavtvseries from "../../assets/icon-nav-tv-series.svg";
import iconnavbookmark from "../../assets/icon-nav-bookmark.svg";
// Child Components
import UserAuthenticationButton from "../UserAuthenticationButton/UserAuthenticationButton";

const Aside = () => (
  <div className="Aside d-flex flex-xs-row flex-md-column text-center justify-content-center">
    <div className="mt-4 mb-4">
      <img src={logo} alt="logo" className=" mx-4 mx-md-0 " />
    </div>
    <div>
      <ul className=" d-md-block d-flex flex-row p-0">
        <li>
          <Link to="/">
            <img src={iconnavhome} className=" mx-4 mx-md-0 mt-4" alt="Home" />
          </Link>
        </li>
        <li>
          <Link to="/movies">
            <img
              src={iconnavmovies}
              className=" mx-4 mx-md-0 mt-4"
              alt="Movies"
            />
          </Link>
        </li>
        <li>
          <Link to="/series">
            <img
              src={iconnavtvseries}
              className=" mx-4 mx-md-0 mt-4"
              alt="TV Series"
            />
          </Link>
        </li>
        <li>
          <Link to="/my-bookmarks">
            <img
              src={iconnavbookmark}
              className=" mx-4 mx-md-0 mt-4"
              alt="My Bookmarks"
            />
          </Link>
        </li>
      </ul>
    </div>
    <div className="mt-auto mb-3 mx-4 mx-md-0 ">
      <UserAuthenticationButton />
    </div>
  </div>
);

export default Aside;
