import React from "react";
//CSS
import "./ThumbnailTopRated.scss";
// Images
import iconCategoryMovie from "../../assets/icon-category-movie.svg";
import iconCategoryTV from "../../assets/icon-category-tv.svg";
import BookmarkTag from "../BookmarkTag/BookmarkTag";

const ThumbnailTopRated = ({ item }) => {
  return (
    <figure className="figure mx-2 position-relative">
      <img
        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.poster_path}`}
        className="figure figure-img rounded"
        alt={item.name ? item.name : item.title}
      />
      <BookmarkTag item={item} />
      <figcaption className="figure-caption position-absolute bottom-0 start-0 ms-3 mb-3">
        <div className="figure-description d-flex align-items-center">
          {item.first_air_date
            ? item.first_air_date.substring(0, 4)
            : item.release_date.substring(0, 4)}
          · {!item.adult ? "PG  " : "+18  "}
          <i className="fa-solid fa-ranking-star ms-2 me-1"></i>
          {Math.floor(item.vote_average)}
        </div>
        <h3>{item.name ? item.name : item.title}</h3>
      </figcaption>
    </figure>
  );
};

export default ThumbnailTopRated;
