import MovieCard from "./card";
import { useGetAllMoviesQuery } from "./Slice/apiSlice";
import Loading from "./loading";

export default function NewMovie() {
  const { data: moviesData, error, isLoading } = useGetAllMoviesQuery();

  // Extract the movies array from the API data
  const movies = moviesData?.results?.slice(0, 2) || []; // Limit to first 4 movies

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="px-8 py-4">
      {/* Card Grid */}
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 place-items-center">
        {movies.map((movie) => {
          const description = movie.overview.split(" ").slice(0, 6).join(" "); // Slice the title to 6 words

          return (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              year={movie.release_date?.split("-")[0]} // Extract the year from release_date
              duration={movie.runtime || "N/A"} // Fallback to "N/A" if runtime is unavailable
              description={description}
              img={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} // Use the image path from TMDB
            />
          );
        })}
      </div>
    </div>
  );
}
