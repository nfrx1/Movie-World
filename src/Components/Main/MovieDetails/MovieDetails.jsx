import { MoveLeft } from "lucide-react";
import { useState, useEffect } from "react";
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

  if (loading) return <div className="p-4 text-center w-full">Loading...</div>;
  if (error)
    return <div className="p-4 text-center text-error w-full">Error: {error}</div>;

  return (
    <div className="p-3 sm:p-4 md:p-6 flex flex-col gap-4 pb-28 md:pb-8 w-full overflow-x-hidden">
      <button
        className="btn btn-dash btn-accent btn-sm md:btn-md w-fit"
        onClick={() => setMovieId(null)}
      >
        <MoveLeft className="w-4 h-4 md:w-5 md:h-5" /> Go Back
      </button>

      <div className="card lg:card-side w-full bg-base-300 overflow-hidden">
        <figure className="w-full sm:w-64 lg:w-72 mx-auto lg:mx-0 shrink-0 overflow-hidden rounded-t-box lg:rounded-l-box lg:rounded-tr-none">
          <img
            src={
              movieInfo?.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`
                : null
            }
            alt={movieInfo ? movieInfo.title : ""}
            className="aspect-2/3 w-full h-full object-cover"
          />
        </figure>
        <div className="card-body p-4 sm:p-6">
          <h2 className="card-title text-lg sm:text-xl md:text-2xl">
            {movieInfo?.title}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed opacity-90">
            {movieInfo?.overview}
          </p>
          <div className="card-actions flex-col gap-4 mt-4 w-full">
            <div className="flex flex-wrap gap-2">
              {movieInfo?.genres?.map((e) => (
                <div
                  className="badge badge-dash badge-secondary badge-sm sm:badge-md"
                  key={e.id}
                >
                  {e.name}
                </div>
              ))}
            </div>
            <div className="stats stats-vertical sm:stats-horizontal shadow bg-base-200 w-full">
              <div className="stat place-items-center py-3">
                <div className="stat-title text-xs">Status</div>
                <div className="stat-value text-lg sm:text-2xl text-secondary">
                  {movieInfo?.status}
                </div>
                <div className="stat-desc text-xs">Released or not</div>
              </div>
              <div className="stat place-items-center py-3">
                <div className="stat-title text-xs">Vote average</div>
                <div className="stat-value text-lg sm:text-2xl">
                  {movieInfo?.vote_average?.toFixed(1)}
                </div>
                <div className="stat-desc text-xs">
                  {movieInfo?.vote_count} voted
                </div>
              </div>
              <div className="stat place-items-center py-3">
                <div className="stat-title text-xs">Language</div>
                <div className="stat-value text-lg sm:text-2xl">
                  {movieInfo?.original_language?.toUpperCase()}
                </div>
                <div className="stat-desc text-xs">Original language</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center mt-6 md:mt-12 mb-2">
        <h2 className="text-xl md:text-2xl tracking-tight font-semibold">
          Recommendations
        </h2>
      </div>
      <MovieRecommendations movieId={movieId} setMovieId={setMovieId} />
    </div>
  );
};

export default MovieDetails;