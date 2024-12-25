import { useState } from "react";
import { useMovieContext } from "../context/MovieContext";

const genres = [
  // Movie Genres
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },

  // TV Show Genres
  { id: 10759, name: "Action & Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 10762, name: "Kids" },
  { id: 9648, name: "Mystery" },
  { id: 10763, name: "News" },
  { id: 10764, name: "Reality" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10766, name: "Soap" },
  { id: 10767, name: "Talk" },
  { id: 10768, name: "War & Politics" },
  { id: 37, name: "Western" },
];

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);
  const [about, setAbout] = useState(false);

  const onFavoriteClick = (e) => {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  };

  const aboutHandler = (e) => {
    e.preventDefault();
    setAbout(!about);
  };

  const genreNames = movie.genre_ids
    .map((id) => genres.find((genre) => genre.id === id)?.name)
    .filter(Boolean)
    .join(", ");

  const mouseHandler = () => {
    setAbout(false);
  };

  return (
    <div className="relative rounded-lg overflow-hidden bg-[#1a1a1a] transition-transform duration-200 h-full flex flex-col hover:transform hover:translate-y-[-5px]">
      <div
        onMouseLeave={mouseHandler}
        className="relative w-[100%] aspect-[2/3]"
      >
        <div className="px-4 py-1 rounded-2xl bg-yellow-300 absolute bottom-0 font-semibold right-0 z-10">
          {movie.vote_average.toFixed(1)}
        </div>
        <img
          className="w-full h-full object-cover text-gray-400"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-black/10 to-black/80 opacity-0 transition-opacity duration-200 flex flex-col justify-end p-4 hover:opacity-100">
          <button
            className={`absolute top-4 right-4 text-white text-xl p-2 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center transition-bg duration-200 hover:bg-black/80 
              ${favorite ? "fill-[#fb0f0f]" : "fill-white"}`}
            onClick={onFavoriteClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>

          <div className="w-full h-full">
            <button
              onClick={aboutHandler}
              className="text-white text-md bg-black/80 py-1 px-3 rounded-full"
            >
              About
            </button>

            <p
              className={`text-sm text-gray-300 font-semibold bg-black/70 p-3 rounded-2xl absolute bottom-4 left-4 transition-all delay-200 ease-in-out right-4 ${
                about ? "opacity-100" : "opacity-0"
              }`}
            >
              {movie.overview}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col gap-2">
        <h3 className="text-lg m-0 text-white font-bold">{movie.title}</h3>
        <div>
          <p className="text-sm text-[#999]">
            {movie.release_date?.split("-")[0]}
          </p>
          <p className="text-sm text-[#999] flex">{genreNames}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
