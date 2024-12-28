import { useState } from "react";
import {
  Navbar,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { StarIcon, BellIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Search from "./Search";
import NewMovie from "./newMovies";

export default function NavBar() {
  // State to toggle NewMovie component visibility
  const [showNewMovies, setShowNewMovies] = useState(false);

  // Toggle handler for notification button
  const toggleNewMovies = () => {
    setShowNewMovies(!showNewMovies);
  };

  return (
    <>
      {/* Navbar Component */}
      <Navbar
        variant="gradient"
        color="blue-gray"
        fullWidth="true"
        className="mx-auto w-full from-blue-gray-900 to-blue-gray-800"
      >
        <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
          {/* Logo Section */}
          <Link to={"/"}>
            <Typography
              as="a"
              variant="h6"
              className="mr-4 ml-2 cursor-pointer py-1.5 text-xl roboto-black"
            >
              Awra Movie
            </Typography>
          </Link>

          {/* Icons Section */}
          <div className="ml-auto mr-3 flex gap-3 md:mr-4">
            {/* Favorite Button */}
            <Link to={"/favorite"}>
              <IconButton variant="text" color="white">
                <StarIcon className="h-5 w-5 md:h-6 md:w-6" />
              </IconButton>
            </Link>

            {/* Notification Button */}
            <IconButton
              variant="text"
              color="white"
              onClick={toggleNewMovies}
            >
              <BellIcon className="h-5 w-5 md:h-6 md:w-6" />
            </IconButton>
          </div>

          {/* Search Bar */}
          <Search />
        </div>
      </Navbar>

      {/* NewMovie Component - Visible when showNewMovies is true */}
      {showNewMovies && (
        <div className="absolute top-16 right-0 w-full bg-white shadow-lg z-50">
          <NewMovie />
        </div>
      )}
    </>
  );
}
