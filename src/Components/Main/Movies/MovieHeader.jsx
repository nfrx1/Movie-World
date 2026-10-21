import { useEffect, useState } from "react";

const MovieHeader = ({ setMovieId, tap, genreId }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (tap === "Genres" && !genreId) return;

    const controller = new AbortController();
    const fetchTopRatedMovie = async () => {
      setLoading(true);
      const API_KEY = import.meta.env.VITE_API_KEY;

      const url =
        tap === "Discover"
          ? "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
          : tap === "Trending"
            ? "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
            : tap === "Genres"
              ? `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&page=1`
              : null;

      if (!url) return;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setMovie(data.results?.[0] || null);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedMovie();
    return () => controller.abort();
  }, [tap, genreId]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error)
    return <div className="p-4 text-center text-error">Error: {error}</div>;
  if (!movie) return null;

  return (
    <div className="w-full card image-full rounded-none md:rounded-box shadow-sm h-fit overflow-hidden">
      <figure>
        <img
          className="w-full h-56 sm:h-72 md:h-96 object-top object-cover brightness-100"
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          alt={movie.title || "Movie Backdrop"}
        />
      </figure>
      <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent"></div>
      <div className="card-body p-4 sm:p-6 md:p-8 justify-end">
        <h2 className="card-title text-white text-lg sm:text-xl md:text-3xl line-clamp-1">
          {movie.title}
        </h2>
        <div className="card-actions mt-1">
          <button
            className="btn btn-primary btn-sm md:btn-md"
            onClick={() => {
              setMovieId(movie.id);
              window.scrollTo({ top: 0, behavior: "smooth" });
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