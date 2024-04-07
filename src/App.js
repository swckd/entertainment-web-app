import "bootstrap/dist/css/bootstrap.css";
import "./App.scss";
import { Route, Routes } from "react-router-dom"

// Components

import Aside from "./components/Aside/Aside";
import SearchBar from "./components/SearchBar/SearchBar";

// Routes
import HomePage from "./pages/HomePage"
import MoviesPage from "./pages/MoviesPage"
import SeriesPage from "./pages/SeriesPage"
import SearchResultsPage from "./pages/SearchResultsPage"



function App() {
  return (
    <div className="App d-flex">
        <div className="Aside">
          <Aside></Aside>
        </div>
        <div className="Main ms-5">
          <SearchBar></SearchBar>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="movies" element={<MoviesPage />} />
            <Route path="series" element={<SeriesPage />} />
            <Route path="search-results" element={<SearchResultsPage />} />
          </Routes>
      </div>
    </div>
   
  );
}

export default App;