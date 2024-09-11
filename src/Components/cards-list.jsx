import { useState } from "react";
import { useSelector } from "react-redux";
import MovieCard from "./card";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useGetAllMoviesQuery } from "./Slice/apiSlice";
import Loading from "./loading";

export default function CardsList() {
  const { data: moviesData, error, isLoading } = useGetAllMoviesQuery();
  const searchResults = useSelector((state) => state.search); // Access search results from Redux state
  const filterResults = useSelector((state) => state.filter); // Access filter results from Redux state

  // Determine which movies to display: filter results > search results > API results
  const movies = filterResults.length > 0
    ? filterResults
    : searchResults.length > 0
    ? searchResults
    : moviesData?.results || [];  // Default to an empty array if no data

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Calculate number of pages
  const totalPages = Math.ceil(movies.length / itemsPerPage);

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
        {currentItems.length > 0 ? (
          currentItems.map((movie) => {
            const description = movie.overview.split(" ").slice(0, 6).join(" "); // Slice the overview to 6 words

            return (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                year={movie.release_date?.split("-")[0]}  // Extract the year from release_date
                duration={movie.runtime || "N/A"}  // If runtime is not available, show "N/A"
                lang={movie.original_language}
                rate={movie.vote_average}
                description={description}
                img={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}  // Use the image path from TMDB
              />
            );
          })
        ) : (
          <p>No movies available.</p>
        )}
      </div>

      {/* Pagination Component */}
      {totalPages > 1 && (
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
      )}
    </div>
  );
}
