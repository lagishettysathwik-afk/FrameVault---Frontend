import React, { useEffect, useState } from "react";
import { getMovies } from "../api";
import "./Movies.css";

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies()
      .then((res) => {
        console.log(res.data); // 🔥 DEBUG
        setMovies(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="movies-container">
      {movies.map((movie) => (
        <div className="movie-card" key={movie.id}>
          
          {/* ✅ POSTER FIX */}
          <img
            src={movie.poster}   // 🔥 FIXED HERE
            alt={movie.title}
            className="movie-poster"
          />

          <h3>{movie.title}</h3>
          <p>{movie.release_year}</p>

          {/* 🎬 TRAILER BUTTON */}
          <a
            href={movie.trailer_link}
            target="_blank"
            rel="noreferrer"
            className="trailer-btn"
          >
            ▶ Watch Trailer
          </a>

        </div>
      ))}
    </div>
  );
}

export default Movies;