import axios from "axios";

const API = axios.create({
  baseURL: "https://framevault-backend.onrender.com/api/v1",
});

export const getMovies = () => API.get("/movies");