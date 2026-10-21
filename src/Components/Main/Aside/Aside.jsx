import { useEffect, useState } from "react"
import { Compass, Flame, Film } from "lucide-react"
import { motion } from "motion/react"

const container = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.15 } },
}

const items = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" } },
}

const Aside = ({ tap, setTap, setMovieId, setGenreId, genreId }) => {
  const [genres, setGenres] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchGenres() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?language=en`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
            signal: controller.signal,
          },
        )

        if (!response.ok) {
          throw new Error("Failed to fetch movie details")
        }

        const data = await response.json()
        setGenres(data.genres)
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err)
        }
      }
    }

    fetchGenres()

    return () => controller.abort()
  }, [])

  const handleNavClick = (newTap) => {
    setTap(newTap)
    if (newTap === "Genres" && genreId == null && genres?.length > 0) {
      setGenreId(genres[0].id)
    }
    setMovieId(null)
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }

  return (
    <>
      <aside className="shrink-0 hidden md:flex sticky min-h-screen h-fit top-0 bg-base-100 p-4 w-56 flex-col gap-6 border-r border-base-200">
        <div className="px-2 text-xs font-semibold tracking-wider text-base-content/60 uppercase">
          Menu
        </div>

        <motion.ul
          variants={container}
          initial="hidden"
          animate="visible"
          className="menu font-medium gap-2 p-0 w-full"
        >
          <motion.li variants={items}>
            <a
              className={
                tap === "Discover"
                  ? "active bg-primary text-primary-content hover:bg-primary/90 flex items-center gap-3 py-3 rounded-xl font-semibold"
                  : "flex items-center gap-3 py-3 rounded-xl hover:bg-base-200 transition-colors"
              }
              onClick={() => handleNavClick("Discover")}
            >
              <Compass className="w-5 h-5" />
              Discover
            </a>
          </motion.li>
          <motion.li variants={items}>
            <a
              className={
                tap === "Trending"
                  ? "active bg-primary text-primary-content hover:bg-primary/90 flex items-center gap-3 py-3 rounded-xl font-semibold"
                  : "flex items-center gap-3 py-3 rounded-xl hover:bg-base-200 transition-colors"
              }
              onClick={() => handleNavClick("Trending")}
            >
              <Flame className="w-5 h-5" />
              Trending
            </a>
          </motion.li>
          <motion.li variants={items}>
            <details
              open={tap === "Genres"}
              className="group"
              onClick={() => handleNavClick("Genres")}
            >
              <summary
                className={`flex items-center gap-3 py-3 px-4 rounded-xl font-semibold cursor-pointer transition-colors ${
                  tap === "Genres"
                    ? "bg-primary text-primary-content hover:bg-primary/90"
                    : "hover:bg-base-200"
                }`}
              >
                <Film className="w-5 h-5" />
                <span>Genres</span>
              </summary>
              <ul className="mt-1 max-h-64 overflow-y-auto">
                {genres?.map((e) => (
                  <li
                    key={e.id}
                    onClick={(event) => {
                      event.stopPropagation()
                      setTap("Genres")
                      setGenreId(e.id)
                      setMovieId(null)
                      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                    }}
                  >
                    <a className={genreId === e.id ? "active font-bold" : ""}>
                      {e.name}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          </motion.li>
        </motion.ul>
      </aside>

      {tap === "Genres" && genres && (
        <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 bg-base-100/95 backdrop-blur-md border-t border-base-200 px-3 py-2 flex gap-2 overflow-x-auto no-scrollbar shadow-lg">
          {genres.map((e) => (
            <button
              key={e.id}
              onClick={() => {
                setGenreId(e.id)
                setMovieId(null)
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
              }}
              className={`btn btn-xs sm:btn-sm rounded-full shrink-0 ${
                genreId === e.id ? "btn-primary" : "btn-ghost bg-base-200"
              }`}
            >
              {e.name}
            </button>
          ))}
        </div>
      )}
      {tap === "Genres" && genres && (
        <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 bg-base-100/95 backdrop-blur-md border-t border-base-200 px-3 py-2 flex gap-2 overflow-x-auto no-scrollbar shadow-lg">
          {genres.map((e) => (
            <button
              key={e.id}
              onClick={() => {
                setGenreId(e.id)
                setMovieId(null)
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
              }}
              className={`btn btn-xs rounded-full shrink-0 ${
                genreId === e.id ? "btn-primary" : "btn-ghost bg-base-200"
              }`}
            >
              {e.name}
            </button>
          ))}
        </div>
      )}

      <div className="md:hidden dock dock-md z-50 bg-base-100 border-t border-base-200">
        <button
          className={tap === "Discover" ? "dock-active text-primary" : ""}
          onClick={() => {
            setTap("Discover")
            setMovieId(null)
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
          }}
        >
          <Compass className="size-[1.2em]" />
          <span className="dock-label text-xs">Discover</span>
        </button>

        <button
          className={tap === "Trending" ? "dock-active text-primary" : ""}
          onClick={() => {
            setTap("Trending")
            setMovieId(null)
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
          }}
        >
          <Flame className="size-[1.2em]" />
          <span className="dock-label text-xs">Trending</span>
        </button>

        <button
          className={tap === "Genres" ? "dock-active text-primary" : ""}
          onClick={() => {
            setTap("Genres")
            if (genreId == null && genres?.length > 0) {
              setGenreId(genres[0].id)
            }
            setMovieId(null)
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
          }}
        >
          <Film className="size-[1.2em]" />
          <span className="dock-label text-xs">Genres</span>
        </button>
      </div>
    </>
  )
}

export default Aside
