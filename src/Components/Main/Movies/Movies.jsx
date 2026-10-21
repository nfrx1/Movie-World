import { useEffect, useRef, useState } from "react"
import MovieCard from "./MovieCard"

const CATEGORIES = [
  { value: "popular", label: "Popular" },
  { value: "top_rated", label: "Top Rated" },
  { value: "upcoming", label: "Up Coming" },
]

const Movies = ({ setMovieId, tap, genreId }) => {
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState("popular")
  const [movies, setMovies] = useState([])
  const [totalPages, setTotalPages] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const API_KEY = import.meta.env.VITE_API_KEY

  const prevTapRef = useRef(tap)

  function buildUrl(pageToFetch) {
    if (tap === "Discover") {
      return `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${pageToFetch}`
    }
    if (tap === "Trending") {
      return `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${pageToFetch}`
    }
    if (tap === "Genres" && genreId) {
      return `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=${pageToFetch}`
    }
    return null
  }

  async function fetchMovies(signal, pageToFetch, replace = false) {
    const url = buildUrl(pageToFetch)
    if (!url) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        signal,
      })

      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }

      const responseJson = await response.json()

      setMovies((prevMovies) => {
        const base = replace ? [] : prevMovies
        const existingIds = new Set(base.map((movie) => movie.id))
        const newUniqueMovies = (responseJson.results || []).filter(
          (movie) => !existingIds.has(movie.id),
        )
        return [...base, ...newUniqueMovies]
      })
      setTotalPages(responseJson.total_pages)
      setPage(pageToFetch + 1)
    } catch (err) {
      if (err.name === "AbortError") return
      console.error(err)
      setError("Failed to load movies. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    const tapChanged = prevTapRef.current !== tap
    prevTapRef.current = tap

    if (tapChanged && category !== "popular") {
      setCategory("popular")
      return () => controller.abort()
    }

    setMovies([])
    setPage(1)
    setTotalPages(null)
    setError(null)

    fetchMovies(controller.signal, 1, true)

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tap, category, genreId])

  const handleCategoryChange = (e) => {
    const value = typeof e === "string" ? e : e.target.value
    setCategory(value)
  }

  const handleLoadMore = () => {
    const controller = new AbortController()
    fetchMovies(controller.signal, page, false)
  }

  const hasMore = totalPages === null || page <= totalPages

  return (
    <div className="flex flex-col gap-4 items-center w-full px-3 sm:px-6 pb-28 md:pb-10">
      <div
        className={`flex items-center w-full pt-2 mb-2 md:mb-6 ${
          tap === "Discover" ? "justify-between" : "justify-center"
        }`}
      >
        <h2 className="text-xl md:text-2xl tracking-tight font-semibold">
          {tap}
        </h2>
        {tap === "Discover" && (
          <select
            id="movie-category"
            className="select select-sm md:select-md w-40 sm:w-56 md:w-72"
            value={category}
            onChange={handleCategoryChange}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-5 md:gap-8 justify-center w-full">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            img={movie.poster_path ? movie.poster_path : null}
            movieId={movie.id}
            setMovieId={setMovieId}
          >
            {movie.title}
          </MovieCard>
        ))}
      </div>

      {error && <p className="text-error text-sm">{error}</p>}

      {loading && movies.length === 0 ? (
        <span className="loading loading-spinner loading-lg text-primary my-8" />
      ) : (
        hasMore &&
        (tap === "Discover" || tap === "Genres") && (
          <button
            className="btn btn-secondary mt-4"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "View more..."}
          </button>
        )
      )}
    </div>
  )
}

export default Movies
