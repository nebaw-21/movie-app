import { Button, Rating } from "@material-tailwind/react";
import { HandThumbUpIcon, HandThumbDownIcon, PlayCircleIcon, TrashIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFav } from "./Slice/addToFav";
import NoFavorites from "./no_avorite_movie";

export default function FavoriteDescription() {
  const dispatch = useDispatch();
  const favoriteMovies = useSelector((state) => state.fav);

  function handleRemove(id) {
    dispatch(removeFromFav(id));
  }

  // Ensure favoriteMovies is an array
  if (!Array.isArray(favoriteMovies) || favoriteMovies.length === 0) {
    return <NoFavorites/>;
  }


  return (
    <div className="p-4 md:p-10">
      {favoriteMovies.map((movie) => (
        <div
          key={movie.id}
          className="flex flex-col md:flex-row gap-8 w-full h-auto md:h-[450px] rounded-xl shadow-2xl p-6 md:p-8 bg-white"
        >
          {/* Image Section */}
          <div className="hidden md:block w-full md:w-1/5">
          <img
            src={movie.img}
            alt={`${movie.title} Poster`}
            className="rounded-xl hover:scale-105 duration-500 w-full object-cover h-[360px]"
          />
          <div className="flex mt-3 justify-around">
            <Button color="blue" className="hover:scale-105 flex gap-2">
              <HandThumbUpIcon className="h-4 w-4" />{" "}
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
              <Button color="blue" className="flex  md:gap-2 hover:scale-105">
                <PlayCircleIcon className="w-6 h-6" />
                <span className="roboto-bold text-xs md:text-sm">Watch Now</span>
              </Button>

              <Button
                onClick={() => handleRemove(movie.id)} // Corrected here
                className="flex items-center gap-1 md:gap-3 hover:scale-105"
              >
                <TrashIcon className="h-5 w-5" />
                Remove from Favorite
              </Button>

            </div>

            <h1 className="mt-4 roboto-bold text-2xl">{movie.title}</h1>

            <div className="flex flex-wrap gap-4 mt-4">
              <Button
                color="white"
                className="flex gap-2 border border-black py-2 px-4"
              >
                <VideoCameraIcon className="h-5 w-5" />
                <span className="roboto-bold text-sm">Trailer</span>
              </Button>
              <Button
                color="white"
                className="border border-black px-6 py-0 roboto-bold text-sm"
              >
                HD
              </Button>
              <div className="flex gap-2 ml-4 roboto-bold">
              <span className=" mt-4 md:mt-2 roboto-black">{Math.floor(movie.rate / 2 * 10) / 10}</span>
              <Rating ratedColor="yellow" value={Math.floor(movie.rate / 2)} />
              <span className="mt-2 ml-3">Based on {movie.vote} Reviews</span>
            </div>
            </div>

            <h1 className="mt-4 roboto-medium">{movie.description}</h1>
            <div className="flex flex-col md:flex-row mt-4 gap-8 md:gap-16 roboto-medium">
            <div>
              <p className="hover:text-blue-800 hover:cursor-pointer">
                Released: {movie.year}
              </p>
            </div>
            <div>
              <p className="hover:text-blue-800 hover:cursor-pointer">
                Duration: {movie.duration} min
              </p>
            </div>
          </div>

          {/* Genre Section */}
          <div className="flex mt-4">
            <span>Genre:</span>
            <div className="flex gap-4">

              {Array.isArray(movie.genre) && movie.genre.length > 0 ? (
                movie.genre.map((gen) => (
                  <span key={gen.id}>{gen.name}</span>
                ))
              ) : (
                <span>No genres available</span>
              )}
            </div>
          </div>
          </div>
        </div>
      ))}
    </div>
  );
}
