import React, { useEffect, useState } from "react";
import { Compass, Flame, Film } from "lucide-react";
import { motion } from "motion/react";

const container = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.15 } },
};

const items = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" } },
};

const Aside = ({ tap, setTap, setMovieId, setGenreId, genreId }) => {
  const [genres, setGenres] = useState(null);
  useEffect(() => {
    const controller = new AbortController();

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
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const data = await response.json();
        setGenres(data.genres);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      }
    }

    fetchGenres();

    return () => controller.abort();
  }, []);
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
                tap == "Discover"
                  ? "active bg-primary text-primary-content hover:bg-primary/90 flex items-center gap-3 py-3 rounded-xl font-semibold"
                  : "flex items-center gap-3 py-3 rounded-xl hover:bg-base-200 transition-colors"
              }
              onClick={() => {
                setTap("Discover");
                setMovieId(null);
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              <Compass className="w-5 h-5" />
              Discover
            </a>
          </motion.li>
          <motion.li variants={items}>
            <a
              className={
                tap == "Trending"
                  ? "active bg-primary text-primary-content hover:bg-primary/90 flex items-center gap-3 py-3 rounded-xl font-semibold"
                  : "flex items-center gap-3 py-3 rounded-xl hover:bg-base-200 transition-colors"
              }
              onClick={() => {
                setTap("Trending");
                setMovieId(null);
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              <Flame className="w-5 h-5" />
              Trending
            </a>
          </motion.li>
          <motion.li variants={items}>
            <details
              open={false}
              className="group"
              onClick={(e) => {
                setTap("Genres");
                genreId==null?setGenreId(genres[0].id):null
                setMovieId(null);
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
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
              <ul>
                {genres
                  ? genres.map((e) => (
                      <li
                        key={e.id}
                        onClick={() => {
                          setGenreId(e.id);
                        }}
                      >
                        <a>{e.name}</a>
                      </li>
                    ))
                  : null}
              </ul>
            </details>
          </motion.li>
        </motion.ul>
      </aside>
      <div className="md:hidden dock dock-md">
        <button
          className={tap == "Discover" ? "dock-active" : null}
          onClick={() => {
            setTap("Discover");
            setMovieId(null);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          <Compass className="size-[1.2em]" /> Discover
        </button>
        <button
          className={tap == "Trending" ? "dock-active" : null}
          onClick={() => {
            setTap("Trending");
            setMovieId(null);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          <Flame className="size-[1.2em]" /> Trending
        </button>
      </div>
    </>
  );
};

export default Aside;
