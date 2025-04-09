import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      </Link>
      <h2>{movie.title}</h2>
      <p>{movie.overview.slice(0, 100)}...</p>
      <b>Rating: {movie.vote_average}</b>
    </div>
  );
};

export default MovieCard;
