import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Project8_Movies/Component/Home";
import MovieDetail from "./Project8_Movies/Component/MovieDetails";
import Footer from "./Project8_Movies/Component/Footer";
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
