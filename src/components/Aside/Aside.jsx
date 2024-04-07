import React from "react";
import "./Aside.scss";

import logo from "../../assets/logo.svg";
import avatar from "../../assets/image-avatar.png";
import iconnavhome from "../../assets/icon-nav-home.svg";
import iconnavmovies from "../../assets/icon-nav-movies.svg";
import iconnavtvseries from "../../assets/icon-nav-tv-series.svg";
import iconnavbookmark from "../../assets/icon-nav-bookmark.svg";


import { Link } from 'react-router-dom';

const Aside = () => (
  <div className="Aside d-flex flex-column text-center">
    <div className="mt-4 mb-4">
      <img src={logo} className="" />
    </div>
    <div>
      <ul className="p-0">
        <li>
          <Link to="/">
            <img src={iconnavhome} className="mt-4" alt="Home"/>
          </Link>
        </li>
        <li>
        <Link to="/movies">
            <img src={iconnavmovies} className="mt-4" alt="Movies"/>
            </Link>
        </li>
        <li>
        <Link to="/series">
            <img src={iconnavtvseries} className="mt-4" alt="TV Series" />
            </Link>
        </li>
        <li>
        <Link to="/">
            <img src={iconnavbookmark} className="mt-4"  alt="My Bookmarks"/>
            </Link>
        </li>
      </ul>
    </div>
    <div className="mt-auto mb-3">
      <img
        src={avatar}
        className="avatar-img rounded-circle"
        alt="User profile pic"
      />
    </div>
  </div>
);



export default Aside;
