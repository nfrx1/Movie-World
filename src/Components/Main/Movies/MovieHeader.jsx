import React, { useEffect, useState } from "react";

const MovieHeader = ({ setMovieId, tap, genreId, setGenreId }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopRatedMovie = async () => {
      const API_KEY = import.meta.env.VITE_API_KEY;

      try {
        const response = await fetch(
          tap == "Discover"
            ? "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
            : tap == "Trending"
              ? "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
              : tap == "Genres"
                ? `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&page=1`
                : null,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setMovie(data.results[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedMovie();
  }, [tap, genreId]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error)
    return <div className="p-4 text-center text-error">Error: {error}</div>;
  if (!movie) return null;

  return (
    <div className="w-full card image-full shadow-sm h-fit">
      <figure>
        <img
          className="aspect-video md:h-96 w-full object-top object-cover h-48 brightness-100"
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          alt={movie.title || "Movie Backdrop"}
        />
      </figure>
      <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/30 via-30% to-transparent"></div>
      <div className="card-body justify-end">
        <h2 className="card-title text-white max-w-[20ch] md:max-w-none truncate md:overflow-visible">
          {movie.title}
        </h2>
        <div className="card-actions">
          <button
            className="btn btn-primary"
            onClick={() => {
              setMovieId(movie.id);
              window.scrollTo(0, 0);
            }}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieHeader;
