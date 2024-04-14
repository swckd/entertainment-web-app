/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
  }
});

const getTrendingData = async () => {
  try {
    const response = await axiosInstance.get('/trending/all/day', {
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

    let myArray = [...movieResponse.data.results, ...seriesResponse.data.results];

    // This will mix the TV Series and Movies && will give me only 10 items
    return myArray.sort(() => Math.random() - 0.5).slice(0, 10) || [];

    // return response.data;
  } catch (error) {
    console.error('Failed to fetch Top Rated', error);
  }
}

const getMoviesData = async () => {
  try {
    const response = await axiosInstance.get('/trending/movie/day',
      {
        params: { language: 'en-US' },
      });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch movies', error);
  }
}

const getSeriesData = async () => {
  try {
    const response = await axiosInstance.get('/tv/popular',
      {
        params: { language: 'en-US', page: '1' },
      });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch series', error);
  }
}

const getSearchData = async (query) => {
  try {
    const response = await axiosInstance.get("/search/multi",
      {
        params: {
          query: query,
          include_adult: 'false',
          language: 'en-US',
          page: '1',
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

const createSession = async (username, password, requestToken) => {
  try {
    const response = await axiosInstance.post("/authentication/session/new",
      {
        username: `${username}`,
        password: `${password}`,
        request_token: `${requestToken}`
      },
      {
        headers: {
          'content-type': 'application/json'
        }
      }
    );
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
    const response = await axiosInstance.get(`https://api.themoviedb.org/3/account?session_id=${session_id}`)
    return response.data;
  } catch (error) {
    console.error('Failed to get Account Data', error);
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
  createSession,
  deleteSession,
  getAccountData
};