import axios from 'axios';

const API_BASE_URL = 'https://framevault-backend.onrender.com';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllMovies = () => axiosInstance.get('/movies');
export const getMovieById = (id) => axiosInstance.get(`/movies/${id}`);
export const getMoviesByLanguage = (language) => axiosInstance.get(`/movies/language/${language}`);
export const getAllLanguages = () => axiosInstance.get('/movies/languages');

export default axiosInstance;