import React from 'react';
import PropTypes from 'prop-types';
import './BookmarkTag.scss';

// import Thumbnail from '../Thumbnail/Thumbnail';



const BookmarkTag = ({data, item}) => {



  return (
    <div className='BookmarkTag rounded-circle position-absolute top-0 end-0 mt-2 me-2 d-flex justify-content-center align-items-center' style={{width: "32px", height: "32px"}}
    
    
    >
      <i className={`bi ${item.isBookmarked === false ? "bi-bookmark" : "bi-bookmark-fill" }`}></i>
    </div>
  );
};
BookmarkTag.propTypes = {};

BookmarkTag.defaultProps = {};

export default BookmarkTag;
