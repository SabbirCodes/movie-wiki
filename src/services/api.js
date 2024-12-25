const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
const BASE_URL = import.meta.env.VITE_MOVIE_URL;

export const getPopularMovies = async (page) => {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
    const data = await res.json();
    return data.results;
}

export const trendingMovies = async () => {
    const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results;
}
export const genreList = async () => {
    const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    const data = await res.json();
    return data.genres;    
}

export const searchMovies = async (query, page=1) => {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`);
    const data = await res.json();
    return data.results;
}