import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import REACT_APP_TMDB_API_KEY from "../../api_key";

const apiKey = REACT_APP_TMDB_API_KEY;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    getAllMovies: builder.query({
      query: () => `discover/movie?page=7&include_video=true&api_key=${apiKey}`,  // Fetch all movies
    }),
    getMovie: builder.query({
      query: (id) => `movie/${id}?api_key=${apiKey}`,
    }),
    getNewMovies: builder.query({
      query: () => `/movie/latest?api_key=${apiKey}`,
    }),

    getRecommendedMovie: builder.query({
      query: (movieId) => `movie/${movieId}/recommendations?api_key=${apiKey}`,
    }),
    searchMovies: builder.query({
      query: (keyword) => `search/movie?query=${keyword}&api_key=${apiKey}`,
    }),
    getMoviesByGenres: builder.query({
      query: (genres) => `discover/movie?with_genres=${genres}&api_key=${apiKey}`, // Fetch movies by genres
    }),
  }),
});

export const { useGetAllMoviesQuery, useGetMovieQuery, useSearchMoviesQuery, useGetRecommendedMovieQuery, useGetMoviesByGenresQuery,useGetNewMovies } = apiSlice;

export default apiSlice;
