/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
  }
});

const getTrendingData = async (pageParam) => {
  try {
    const response = await axiosInstance.get('/trending/all/day?page=' + pageParam, {
      params: { language: 'en-US' },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch Trending', error);
  }
}

const getTopRatedData = async () => {
  try {
    const movieResponse = await axiosInstance.get('/movie/top_rated', {
      params: { language: 'en-US', page: '1' },
    });

    const seriesResponse = await axiosInstance.get('/tv/top_rated', {
      params: { language: 'en-US', page: '1' },
    });

    const movies = movieResponse.data.results.map(movie => ({ ...movie, media_type: 'movie' }));
    const series = seriesResponse.data.results.map(serie => ({ ...serie, media_type: 'tv' }));

    let myArray = [...movies, ...series];

    // This will mix the TV Series and Movies && will give me only 10 items
    return myArray.sort(() => Math.random() - 0.5).slice(0, 10) || [];

    // return response.data;
  } catch (error) {
    console.error('Failed to fetch Top Rated', error);
  }
}


const getMoviesData = async (pageParam) => {
  try {
    const response = await axiosInstance.get('/trending/movie/day',
      {
        params: { language: 'en-US', page: pageParam },

      });
    const data = response.data;
    return data;

  } catch (error) {
    console.error('Failed to fetch movies', error);
  }
}

const getSeriesData = async (pageParam) => {
  try {
    const response = await axiosInstance.get('/tv/popular',
      {
        params: { language: 'en-US', page: pageParam },
      });
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Failed to fetch series', error);
  }
}

const getSearchData = async (query, pageParam) => {
  try {
    const response = await axiosInstance.get("/search/multi",
      {
        params: {
          query: query,
          include_adult: 'false',
          language: 'en-US',
          page: pageParam
        }
      });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch query', error);
  }
}

const createGuestSession = async () => {
  try {
    const response = await axiosInstance.get("/authentication/guest_session/new");
    return response.data;
  } catch (error) {
    console.error('Failed to create Guest Session', error);
  }
}

const createRequestToken = async () => {
  try {
    const response = await axiosInstance.get("/authentication/token/new");
    return response.data;
  } catch (error) {
    console.error('Failed to create Request Token', error);
  }
}

const validateRequestToken = async (username, password, request_token) => {
  try {
    const response = await axiosInstance.post("/authentication/token/validate_with_login",
      {
        "username": username,
        "password": password,
        "request_token": request_token
      });
    return response.data;
  } catch (error) {
    console.error('Failed to create Validate Token', error);

  }
}

const createSession = async (validatedRequestToken) => {
  try {
    const response = await axiosInstance.post("authentication/session/new",
      {
        request_token: validatedRequestToken,
      });
    return response.data;
  } catch (error) {
    console.error('Failed to create Request Session', error);
  }
}

const deleteSession = async (session_id) => {
  try {
    const response = await axiosInstance.delete("https://api.themoviedb.org/3/authentication/session",

      { data: { session_id: session_id } }

    );
    return response.data;
  } catch (error) {
    console.error('Failed to Delete Session', error);
  }
}

const getAccountData = async (session_id) => {
  try {
    const response = await axiosInstance.get(`https://api.themoviedb.org/3/account/account_id?session_id=${session_id}`)
    return response.data;
  } catch (error) {
    console.error('Failed to get Account Data', error);
  }
}


const addToWatchlist = async (account_id, media_type, media_id, setWatchlist) => {
  try {
    const response = await axiosInstance.post(`https://api.themoviedb.org/3/account/${account_id}/watchlist`,
      { media_type: media_type, media_id: media_id, watchlist: true });

    return response.data;
  } catch (error) {
    console.error('Failed to add to watchlist', error);
  }

}

const deleteFromWatchlist = async (account_id, media_type, media_id, setWatchlist) => {
  try {
    const response = await axiosInstance.post(`https://api.themoviedb.org/3/account/${account_id}/watchlist`,
      { media_type: media_type, media_id: media_id, watchlist: false });

    return response.data;
  } catch (error) {
    console.error('Failed to delete from watchlist', error);
  }

}
// Only retrieves IDs (for bookmark button functionality)
const getWatchlistItems = async (account_id) => {
  try {
    const moviesResponse = await axiosInstance.get(`https://api.themoviedb.org/3/account/${account_id}/watchlist/movies`);
    const seriesResponse = await axiosInstance.get(`https://api.themoviedb.org/3/account/${account_id}/watchlist/tv`);

    const watchlistItems = [...moviesResponse.data.results, ...seriesResponse.data.results]

    watchlistItems.forEach((item, index) => {
      watchlistItems[index] = item.id;
    })

    return watchlistItems;
  } catch (error) {
    console.error('Failed to get watchlist', error);
  }
}

// Retrives full objects (for my bookmark page)
const getWatchlisted = async (account_id) => {
  try {
    const moviesResponse = await axiosInstance.get(`https://api.themoviedb.org/3/account/${account_id}/watchlist/movies`);
    const seriesResponse = await axiosInstance.get(`https://api.themoviedb.org/3/account/${account_id}/watchlist/tv`);

    const movies = moviesResponse.data.results.map(movie => ({ ...movie, media_type: 'movie' }));
    const series = seriesResponse.data.results.map(serie => ({ ...serie, media_type: 'tv' }));
    const watchlisted = [...movies, ...series]

    return watchlisted;
  } catch (error) {
    console.error('Failed to get watchlist', error);
  }
}


export default {
  axiosInstance,
  getTrendingData,
  getTopRatedData,
  getMoviesData,
  getSeriesData,
  getSearchData,
  createGuestSession,
  createRequestToken,
  validateRequestToken,
  createSession,
  deleteSession,
  getAccountData,
  addToWatchlist,
  deleteFromWatchlist,
  getWatchlistItems,
  getWatchlisted
};