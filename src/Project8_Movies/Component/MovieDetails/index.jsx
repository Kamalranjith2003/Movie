import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./index.css";

const baseUrl = "https://api.themoviedb.org/3";
const api_key = "f255ba050c7dde33ed9a79be865e705c";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showCast, setShowCast] = useState(false);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const movieResponse = await axios.get(`${baseUrl}/movie/${id}`, {
          params: { api_key },
        });
        setMovie(movieResponse.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  const fetchTrailer = async () => {
    if (trailer) return setShowTrailer(!showTrailer);

    try {
      const videoResponse = await axios.get(`${baseUrl}/movie/${id}/videos`, {
        params: { api_key },
      });

      const officialTrailer = videoResponse.data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );

      if (officialTrailer) {
        setTrailer(officialTrailer.key);
        setShowTrailer(true);
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const fetchCast = async () => {
    if (cast.length > 0) return setShowCast(!showCast);

    try {
      const castResponse = await axios.get(`${baseUrl}/movie/${id}/credits`, {
        params: { api_key },
      });

      setCast(castResponse.data.cast.slice(0, 10));
      setShowCast(true);
    } catch (error) {
      console.error("Error fetching cast:", error);
    }
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-detail">
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <b>Rating: {movie.vote_average}</b>

      <div className="buttons">
        <button onClick={fetchTrailer}>
          {showTrailer ? "Hide Trailer" : "Show Trailer"}
        </button>
        <button onClick={fetchCast}>
          {showCast ? "Hide Cast" : "Show Cast"}
        </button>
      </div>

      {showTrailer && trailer && (
        <div className="trailer">
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailer}`}
            title="Movie Trailer"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {showCast && (
        <div className="cast-section">
          <h2>Top Cast</h2>
          <div className="cast-list">
            {cast.map((actor) => (
              <div key={actor.id} className="cast-card">
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                />
                <p>{actor.name}</p>
                <small>as {actor.character}</small>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
