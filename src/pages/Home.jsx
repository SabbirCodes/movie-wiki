import { useState, useEffect, useCallback } from "react";
import { getPopularMovies, searchMovies, genreList } from "../services/api";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
//   const [genre, setGenre] = useState([]);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies(page);
        setMovies((prevMovies) => [...prevMovies, ...popularMovies]);
        setError(null);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }

    setSearchQuery("");
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.title);
    handleSearch({ preventDefault: () => {} });
    setSuggestions([]);
  };

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const fetchSuggestions = useCallback(
    debounce(async (query) => {
      if (query.length < 1) return setSuggestions([]);

      try {
        const results = await searchMovies(query);
        setSuggestions(results);
      } catch (error) {
        console.log(error);
        setSuggestions([]);
      }
    }, 300),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    fetchSuggestions(value);
  };

  return (
    <div>
      <div className="p-8 w-[100%] box-border">
        <form
          className="w-[60vw] mt-0 mx-auto mb-8 justify-center flex gap-4 p-4 box-border relative"
          onSubmit={handleSearch}
        >
          <div className="w-full relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search for movies..."
              className="flex-1 text-white py-3 px-4 border-none rounded-md bg-[#333] text-xl focus:outline-none focus:shadow-sm shadow-[#666] w-[50vw] "
            />
            {suggestions.length > 1 && (
              <ul className="absolute bg-[#333] text-white rounded-md mt-1 w-full max-h-[200px] overflow-y-auto z-10">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className="p-3 hover:bg-[#444] cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.title}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="submit"
            className="py-3 px-6 bg-[#e50914] text-white rounded font-medium transition-colors duration-200 whitespace-nowrap hover:bg-[#f40612]"
          >
            Search
          </button>
        </form>

        {error && <div className="text-white">{error}</div>}

        {loading ? (
          <div className="text-white">Loading...</div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(370px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 p-4 w-full box-border justify-center">
            {movies.map((movie, index) => (
              <MovieCard movie={movie} key={`${movie.id}-${index}`} />
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={handleLoadMore}
            className="py-3 px-6 bg-red-600 text-white rounded-full mt-5 font-medium transition-colors duration-200 whitespace-nowrap hover:bg-red-900"
          >
            Discover more
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
