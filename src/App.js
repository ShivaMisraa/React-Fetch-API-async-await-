import React, { useState, useEffect } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    if (retrying) {
      const retryTimer = setInterval(() => {
        fetchMovieData();
      }, 5000);

      return () => {
        clearInterval(retryTimer);
      };
    }
  }, [retrying]);

  async function fetchMovieData() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://.dev/api/films");
      if (!response.ok) {
        throw new Error("Something went wrong ... Retrying");
      }
      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
      setIsLoading(false);
      setRetrying(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    setRetrying(true);
    }
  }

  function handleRetryClick() {
    setRetrying(true);
  }

  function handleCancelRetryClick() {
    setRetrying(false);
  }

  let content = <p>Found no movies</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = (
      <div>
        <p>{error}</p>
        {retrying ? (
          <button onClick={handleCancelRetryClick}>Cancel Retry</button>
        ) : (
          <button onClick={handleRetryClick}>Retry</button>
        )}
      </div>
    );
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieData}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
