import { useState } from "react";
import MovieCard from "./card";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useGetRecommendedMovieQuery } from "./Slice/apiSlice";
import Loading from "./loading";


// eslint-disable-next-line react/prop-types
export default function RecommendedMovie({movieId}) {
  const { data: moviesData, error, isLoading } = useGetRecommendedMovieQuery(movieId);


  // Extract the movies array from the API data
  const movies = moviesData?.results || [];  // Default to an empty array if moviesData is undefined

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Calculate number of pages
  const totalPages = Math.ceil(movies?.length / itemsPerPage);

  // Get current items to display
  const currentItems = movies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const next = () => {
    if (currentPage === totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="px-8 py-2">
      {/* Card Grid */}
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
  {currentItems.map((movie) => {
    const description = movie.overview.split(" ").slice(0, 6).join(" "); // Slice the title to 6 words

    return (
    
      <MovieCard
        key={movie.id}
        id={movie.id}
        title={movie.title}
        year={movie.release_date?.split("-")[0]}  // Extract the year from release_date
        duration={movie.runtime}  // If duration data isn't available, you can set it to "N/A"
        description={description}
        img={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}  // Use the image path from TMDB
      />
    );
  })}
</div>

      {/* Pagination Component */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={prev}
          disabled={currentPage === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
        </Button>

        {/* Dynamic Page Numbers */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <IconButton
                key={page}
                variant={currentPage === page ? "filled" : "text"}
                color="gray"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </IconButton>
            )
          )}
        </div>

        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={next}
          disabled={currentPage === totalPages}
        >
          Next
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
