import NavBar from "./nav-bar";
import MovieDescription from "./card-description";
import { useParams } from "react-router-dom";
import { useGetMovieQuery } from "./Slice/apiSlice";
import RecommendedMovie from "./recommendedMovies";
import Loading from "./loading";
import Footer from "./footer";


export default function MovieDetail() {
  // Extract the movie id from useParams()
  const { id } = useParams();

  // Fetch movie details using RTK Query
  const { data: movieDetail, error, isLoading } = useGetMovieQuery(id);
  console.log("movie detail",movieDetail);

  // Handle loading and error states
  if (isLoading) {
    return <Loading/>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Prepend base URL for the image if movieDetail contains poster_path
  const posterUrl = movieDetail.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}` 
    : ""; // Default image if not available

  return (
    <>
      <NavBar />

      <div className="relative h-[500px] md:h-[750px]  w-full ">
  {/* Background image */}
  <img
    className=" object-cover object-top  w-full h-full"
    src={posterUrl}
    alt="Movie Poster"
  />
  
  {/* Play button */}
  <div className="absolute inset-0 flex justify-center items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-32 h-32 hover:scale-105 hover:cursor-pointer bg-white rounded-full"
      viewBox="0 0 16 16"
      id="Play"
    >
      <path
        fill="#009ad6"
        d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM6 12V4l6 4-6 4z"
      ></path>
    </svg>
  </div>

  {/* Movie Description */}
  <div className="absolute top-[75%] left-0 w-full">
    <MovieDescription
      id={movieDetail.id}
      title={movieDetail.title}
      year={movieDetail.release_date}
      rate={movieDetail.vote_average}
      duration={movieDetail.runtime}
      genre = {movieDetail.genres}
      vote = {movieDetail.vote_count}
      description={movieDetail.overview}
      img={posterUrl}
    />
  </div>
</div>

<div className="mt-[500px] md:mt-96">
  <h1 className="px-10 roboto-regular text-2xl md:text-3xl">You May Also Like</h1>
        {/* Recommended Movies */}
       <RecommendedMovie movieId={id} />

</div>

<Footer/>

    </>
  );
}
