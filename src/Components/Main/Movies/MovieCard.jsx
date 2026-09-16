import React, { useState } from "react";
import { motion } from "motion/react";

const MovieCard = ({ children, img, movieId, setMovieId }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = Boolean(img) && !imgFailed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileHover={{
        y: -20,
        boxShadow:
          "0px 20px 25px -5px rgba(0, 0, 0, 0.3), 0px 10px 10px -5px rgba(0, 0, 0, 0.2)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3,
          type: "spring",
          stiffness: 200,
          damping: 50,
        },
      }}
      viewport={{ amount: 0.05, once: true}}
      className="card bg-base-300 w-32 md:w-48"
      onClick={() => {
        setMovieId(movieId)
        window.scrollTo(0, 0)
      }}
    >
      <figure className="aspect-2/3 bg-neutral/10 flex items-center justify-center">
        {showImage ? (
          <img
            src={`https://image.tmdb.org/t/p/w342${img}`}
            alt={children}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xs text-center px-2 opacity-60">
            No image available
          </span>
        )}
      </figure>
      <div className="card-body">
        <h3 className="card-title text-[12px] md:text-lg">{children}</h3>
      </div>
    </motion.div>
  );
};

export default MovieCard;
