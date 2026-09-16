import { MoveLeft } from "lucide-react";
import React, { useState, useEffect } from "react";
import MovieRecommendations from "./MovieRecommendations";

const MovieDetails = ({ movieId, setMovieId }) => {
  const [movieInfo, setMovieInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const controller = new AbortController();

    async function fetchMovieInfo() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
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
        setMovieInfo(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMovieInfo();

    return () => controller.abort();
  }, [movieId]);
  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error)
    return <div className="p-4 text-center text-error">Error: {error}</div>;
  return (
    <div className="p-4 flex flex-col gap-4 mb-24 md:mb-8 w-full">
      <button
        className="btn btn-dash btn-accent w-fit"
        onClick={() => setMovieId(null)}
      >
        <MoveLeft /> Go Back
      </button>
      <div className="card lg:card-side w-full bg-base-300">
        <figure className="w-full lg:w-72 shrink-0 overflow-hidden rounded-l-box">
          <img
            src={
              movieInfo
                ? `https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`
                : null
            }
            alt={movieInfo ? movieInfo.title : null}
            className="aspect-2/3 w-full h-full"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{movieInfo ? movieInfo.title : null}</h2>
          <p className="flex-0">{movieInfo ? movieInfo.overview : null}</p>
          <div className="card-actions gap-4 mt-4">
            <div className="flex md:w-96 flex-wrap gap-4">
              {movieInfo
                ? movieInfo.genres.map((e) => (
                    <div
                      className="badge badge-dash badge-secondary"
                      key={e.id}
                    >
                      {e.name}
                    </div>
                  ))
                : null}
            </div>
            <div className="gap-2 stats stats-vertical lg:stats-horizontal shadow w-full">
              <div className="stat place-items-center grid-flow-row">
                <div className="stat-title">Status</div>
                <div className="stat-value text-secondary">
                  {movieInfo ? movieInfo.status : null}
                </div>
                <div className="stat-desc">Realeased or not</div>
              </div>
              <div className="stat place-items-center">
                <div className="stat-title">Vote average</div>
                <div className="stat-value">
                  {movieInfo ? movieInfo.vote_average : null}
                </div>
                <div className="stat-desc">
                  {movieInfo ? movieInfo.vote_count : null} voted
                </div>
              </div>
              <div className="stat place-items-center">
                <div className="stat-title">Original language</div>
                <div className="stat-value">
                  {movieInfo ? movieInfo.original_language.toUpperCase() : null}
                </div>
                <div className="stat-desc">Tne language used</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center mt-12 mb-4">
        <h2 className="text-2xl tracking-tight font-semibold">
          Recommendations
        </h2>
      </div>
      <MovieRecommendations movieId={movieId} setMovieId={setMovieId} />
    </div>
  );
};

export default MovieDetails;
