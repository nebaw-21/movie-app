import {
  Navbar,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { StarIcon, BellIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Search from "./Search";

export default function NavBar() {
  return (
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
          <IconButton variant="text" color="white">
            <BellIcon className="h-5 w-5 md:h-6 md:w-6" />
          </IconButton>
        </div>

        {/* Search Bar */}
        <Search />
      </div>
    </Navbar>
  );
}
