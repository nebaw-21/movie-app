import { Button } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";
import {  useNavigate } from "react-router-dom";

// Component to display when no favorite movies exist
export default function NoFavorites() {
    const navigate = useNavigate();
    const handleNavigate = ()=>{
        navigate("/");
    }

  return (
    <div className="flex flex-col items-center justify-center h-full py-20">
      <HeartIcon className="h-24 w-24 text-red-500 mb-4" />
      <h1 className="text-2xl roboto-black  mb-2">No Favorite Movies</h1>
      <p className="roboto-regular-italic mb-6">You havent added any movies to your favorites yet.</p>
      <Button
        color="blue"
        size="lg"
        className="px-6 py-3"
        onClick={ handleNavigate}
      >
        Browse Movies
      </Button>
    </div>
  );
}
