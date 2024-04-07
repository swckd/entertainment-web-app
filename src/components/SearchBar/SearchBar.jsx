/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//CSS
import "./SearchBar.scss";
// Images
import iconSearch from "../../assets/icon-search.svg";


const SearchBar = () => {

  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  function handleInputValueChange (event) {
    setInputValue(event.target.value);
  }

  function navigateToSearchPage(event) {
    if(event.key === "Enter" && inputValue.trim() !== "") {
      navigate("search-results", {state:{query: query}});
      setInputValue("");
    }
  }

  useEffect(()=> {
    setQuery(inputValue);
  }, [inputValue]);

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
