import React from 'react';
//CSS
import './ThumbnailSearch.scss';
//Images
import iconCategoryMovie from '../../assets/icon-category-movie.svg';
import iconCategoryTV from '../../assets/icon-category-tv.svg';
import noImageAvailable from '../../assets/no-image-available.png';

const ThumbnailSearch = ({ item }) => {
  if (!item) {
    return <div>There are no movies.</div>
  }
  return (
      <figure className="figure mx-2">
        <img src={item.poster_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.poster_path}` : noImageAvailable} className="figure figure-img rounded" alt={item.media_type === "tv" ? item.name : item.title} />
        <figcaption className="figure-caption">
          <div className='figure-description d-flex align-items-center'>{item.first_air_date ? item.first_air_date.substring(0, 4) : item.release_date ? item.release_date.substring(0,4) : "N/A"} · {item.media_type ? item.media_type.charAt(0).toUpperCase() + item.media_type.slice(1) : "Movies"} · {!item.adult ? "PG" : "+18"}</div>
          <h3>{item.name ? item.name : item.title}</h3>
        </figcaption>
      </figure>
  );

};
export default ThumbnailSearch;