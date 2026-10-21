import { useEffect, useState } from "react";
import MovieCard from "../Movies/MovieCard";

const MovieRecommendations = ({ movieId, setMovieId }) => {
  const [movieRecommendations, setMovieRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const controller = new AbortController();

    async function fetchMovieRecommendations() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const data = await response.json();
        setMovieRecommendations(data.results);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMovieRecommendations();

    return () => controller.abort();
  }, [movieId]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error)
    return <div className="p-4 text-center text-error">Error: {error}</div>;

  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-5 md:gap-8 justify-center w-full">
      {movieRecommendations?.map((e) => (
        <MovieCard
          img={e.poster_path}
          setMovieId={setMovieId}
          movieId={e.id}
          key={e.id}
        >
          {e.title}
        </MovieCard>
      ))}
    </div>
  );
};

export default MovieRecommendations;