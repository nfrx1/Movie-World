import { useState } from "react";
import Aside from "./Aside/Aside";
import MovieHeader from "./Movies/MovieHeader";
import Movies from "./Movies/Movies";
import MovieDetails from "./MovieDetails/MovieDetails";

const Main = () => {
  const [movieId, setMovieId] = useState(null);
  const [tap, setTap] = useState("Discover");
  const [genreId, setGenreId] = useState(null);

  return (
    <div className="flex min-h-screen w-full">
      <Aside
        setTap={setTap}
        tap={tap}
        setMovieId={setMovieId}
        setGenreId={setGenreId}
        genreId={genreId}
      />
      {movieId == null ? (
        <div className="flex flex-col gap-1 md:gap-4 w-full min-w-0">
          <MovieHeader
            setMovieId={setMovieId}
            tap={tap}
            genreId={genreId}
            setGenreId={setGenreId}
          />
          <Movies
            setMovieId={setMovieId}
            tap={tap}
            genreId={genreId}
            setGenreId={setGenreId}
          />
        </div>
      ) : (
        <MovieDetails setMovieId={setMovieId} movieId={movieId} />
      )}
    </div>
  );
};

export default Main;