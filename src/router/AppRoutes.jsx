import { Route, Routes } from 'react-router-dom';
import HomePage from "../pages/HomePage"
import MoviesPage from '../pages/MoviesPage';
import SeriesPage from '../pages/SeriesPage';
import SearchResultsPage from '../pages/SearchResultsPage';
import UserLoginPage from '../pages/UserLoginPage';
import UserDashboardPage from '../pages/UserDashboardPage';
import PrivateRoute from './PrivateRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="movies" element={<MoviesPage />} />
      <Route path="series" element={<SeriesPage />} />
      <Route path="search-results" element={<SearchResultsPage />} />
      <Route path="login" element={<UserLoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="user-dashboard" element={<UserDashboardPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;