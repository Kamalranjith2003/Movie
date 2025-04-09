import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../MovieCard";
import Navbar from "../Navbar";
import "./index.css";

const baseUrl = "https://api.themoviedb.org/3";
const api_key = "f255ba050c7dde33ed9a79be865e705c";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const fetchMovies = async () => {
    const url = search ? `${baseUrl}/search/movie` : `${baseUrl}/movie/popular`;

    const response = await axios.get(url, {
      params: { api_key, query: search },
    });

    setMovies(response.data.results);
  };

  useEffect(() => {
    fetchMovies();
  }, [search]);

  return (
    <div className="home">
      <Navbar setSearch={setSearch} />
      <div className="movies-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
