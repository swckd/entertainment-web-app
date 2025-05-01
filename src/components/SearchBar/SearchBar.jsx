/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../contexts/SearchContext";

//CSS
import "./SearchBar.scss";
// Images
import iconSearch from "../../assets/icon-search.svg";


const SearchBar = () => {

  const [inputValue, setInputValue] = useState('');
  // const [query, setQuery] = useState('');

  const { setQuery } = useSearch();

  const navigate = useNavigate();

  function handleInputValueChange(event) {
    setInputValue(event.target.value);
  }

  function navigateToSearchPage(event) {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setQuery(inputValue.trim()); // Actualiza la query en el contexto
      navigate("search-results");
      // navigate("search-results", { state: { query: query } });
      setInputValue("");
    }
  }



  return (
    <div className="SearchBar">
      <div className="input-group input-group-lg">
        <span className="input-group-text" id="inputGroup-sizing-lg">
          <img src={iconSearch} onClick={navigateToSearchPage}
          />
        </span>
        <input
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
          placeholder="Search for movies or TV series"
          value={inputValue}
          onChange={handleInputValueChange}
          onKeyDown={navigateToSearchPage}
        />
      </div>
    </div>
  );


};

export default SearchBar;
