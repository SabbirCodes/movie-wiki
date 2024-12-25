import React from "react";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites) {
    return (
      <div>
        <h2 className="text-4xl text-white font-semibold text-center mt-14">
          Your Favorites
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(370px,1fr))] sm:grid-cols-[repeat(auto-fit,300px)] justify-center gap-6 p-4 w-full box-border">
            {favorites.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
        </div>
      </div>
    );
  }
  return (
    <div>
      <h2>No Favorites</h2>
      <p>You have no favorites.</p>
    </div>
  );
}

export default Favorites;
