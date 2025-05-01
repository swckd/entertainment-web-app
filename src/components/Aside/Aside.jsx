import React from "react";
import { NavLink } from "react-router-dom";
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


const Aside = () => {

  return (


    <div className="Aside d-flex flex-row flex-md-column justify-content-between text-center position-fixed h-75 px-4">
      <div className="d-md-none">
        <img src={logo} className="mt-4" alt="Logo" />
      </div>
      <ul className="d-flex flex-row flex-md-column p-0">
        <li className="d-none d-md-block">
          <img src={logo} className="mt-4" alt="Logo" />
        </li>
        <li className="mr-sm-3">
          <NavLink
            to={`${process.env.PUBLIC_URL}/`}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <img src={iconnavhome} className="mt-4" alt="Home" />
          </NavLink>
        </li>
        <li className="mr-sm-3">
          <NavLink
            to={`${process.env.PUBLIC_URL}/movies`}
            className={({ isActive }) => (isActive ? "active-link" : "")}>
            <img src={iconnavmovies} className="mt-4" alt="Movies" />
          </NavLink>
        </li>
        <li className="mr-sm-3">
          <NavLink
            to={`${process.env.PUBLIC_URL}/series`}
            className={({ isActive }) => (isActive ? "active-link" : "")}>
            <img src={iconnavtvseries} className="mt-4" alt="TV Series" />
          </NavLink>
        </li>
        <li className="mr-sm-3">
          <NavLink
            to={`${process.env.PUBLIC_URL}/my-bookmarks`}
            className={({ isActive }) => (isActive ? "active-link" : "")}>
            <img src={iconnavbookmark} className="mt-4" alt="My Bookmarks" />
          </NavLink>
        </li>
      </ul>
      <div className="p-0 mb-5">
        <UserAuthenticationButton />
      </div>
    </div>

  );

};

export default Aside;
