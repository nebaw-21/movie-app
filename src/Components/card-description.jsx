/* eslint-disable react/prop-types */
import { Button, Rating } from "@material-tailwind/react";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  PlayCircleIcon,
  StarIcon,
  CheckIcon,
  VideoCameraIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { addToFav } from "./Slice/addToFav";

// eslint-disable-next-line react/prop-types
export default function MovieDescription({ id, title, rate, genre, vote, year, duration, description, img }) {
  const dispatch = useDispatch();
  const favoriteMovies = useSelector((state) => state.fav);
  const isMovieAdded = favoriteMovies.some(movie => movie.id === id);
  
  const handleAddToFav = () => {
    if (!isMovieAdded) {
      const movieData = {
        id, title, rate, genre, vote, year, duration, description, img
      };
      dispatch(addToFav(movieData));
    }
  };

  // const handleShare = () => {
  //   // Implement sharing functionality here
  //   alert(`Share ${title}!`);
  // };

  return (
    <div className="p-4 md:p-10">
      <div className="flex flex-col md:flex-row gap-8 w-full h-auto md:h-[450px] rounded-xl shadow-2xl p-6 md:p-8 bg-white">
        {/* Image Section */}
        <div className="hidden md:block w-full md:w-1/5">
          <img
            src={img}
            alt={`${title} Poster`}
            className="rounded-xl hover:scale-105 duration-500 w-full object-cover h-[360px]"
          />
          <div className="flex mt-3 justify-around">
            <Button color="blue" className="hover:scale-105 flex gap-2">
              <HandThumbUpIcon className="h-4 w-4" />
              <span className="roboto-bold">Like</span>
            </Button>
            <Button color="" className="hover:scale-105 flex gap-2">
              <HandThumbDownIcon className="h-4 w-4" />
              <span className="roboto-bold">Dislike</span>
            </Button>
          </div>
        </div>

        {/* Description Section */}
        <div className="w-full md:w-4/5">
          <div className="flex gap-2 md:justify-between">
            <Button color="blue" className="flex md:gap-2 hover:scale-105">
              <PlayCircleIcon className="w-6 h-6" />
              <span className="roboto-bold text-xs md:text-sm">Watch Now</span>
            </Button>

            <Button
              onClick={handleAddToFav}
              className="flex items-center gap-1 md:gap-3 hover:scale-105"
              color={isMovieAdded ? "black" : "blue"}
              disabled={isMovieAdded}
            >
              {isMovieAdded ? (
                <>
                  <CheckIcon className="h-5 w-5" />
                  Added
                </>
              ) : (
                <>
                  <StarIcon className="h-5 w-5" />
                  Add to Favorite
                </>
              )}
            </Button>
          </div>

          <div className="flex gap-4 mt-4">
            <h1 className="roboto-bold text-xl md:text-2xl">{title}</h1>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <Button color="white" className="flex gap-2 border border-black md:py-2 px-4">
              <VideoCameraIcon className="h-5 w-5" />
              <span className="roboto-bold text-sm">Trailer</span>
            </Button>
            <Button color="white" className="border border-black md:px-6 py-0 roboto-bold text-sm">
              HD
            </Button>
            <Button
              onClick={handleShare}
              color="white"
              className="flex justify-center items-center  gap-2 border border-black md:px-6 py-0 roboto-bold text-sm"
            >
              <ShareIcon className="h-5 w-5 " />
              <span>Share</span>
            </Button>

            <div className="flex flex-1 gap-2 ml-4 roboto-bold">
              <span className="mt-4 md:mt-2 roboto-black">{Math.floor(rate / 2 * 10) / 10}</span>
              <Rating ratedColor="yellow" value={Math.floor(rate / 2)} />
              <span className="mt-2 ml-3">Based on {vote} Reviews</span>
            </div>
          </div>

          <p className="mt-4 roboto-medium">{description}</p>

          <div className="flex flex-col md:flex-row mt-4 gap-8 md:gap-16 roboto-medium">
            <div>
              <p className="hover:text-blue-800 hover:cursor-pointer">
                Released: {year}
              </p>
            </div>
            <div>
              <p className="hover:text-blue-800 hover:cursor-pointer">
                Duration: {duration} min
              </p>
            </div>
          </div>

          {/* Genre Section */}
          <div className="flex mt-4">
            <span>Genre:</span>
            <div className="flex gap-4">
              {Array.isArray(genre) && genre.length > 0 ? (
                genre.map((gen) => (
                  <span key={gen.id}>{gen.name}</span>
                ))
              ) : (
                <span>No genres available</span>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
