import  { useState, useEffect } from "react";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Checkbox,
} from "@material-tailwind/react";
import { useGetMoviesByGenresQuery } from "./Slice/apiSlice"; // Import the query hook
import { useDispatch } from "react-redux";
import { setFilterResult } from "./Slice/filterResult"; // Import the action

const genreIdMap = {
  Action: 28,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Family: 10751,
  History: 36,
  Fantasy: 14,
  War: 10752,
  Horror: 27,
  Romance: 10749,
  Adventure: 12,
  Reality: 99,
};

export default function Filter() {
  const [open, setOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [fetchTriggered, setFetchTriggered] = useState(false);
  const dispatch = useDispatch(); // Initialize the dispatch function

  const handleOpen = () => setOpen(!open);

  // Convert genre names to IDs
  const genreIds = selectedGenres.map(genre => genreIdMap[genre]).join(',');

  // Fetch filtered movies based on selected genres
  const { data: moviesData } = useGetMoviesByGenresQuery(genreIds, {
    skip: !fetchTriggered,
  });

  useEffect(() => {
    if (moviesData) {
      dispatch(setFilterResult(moviesData.results)); // Store filtered results in Redux state
    }
  }, [moviesData, dispatch]);

  // Handle genre selection
  const handleGenreChange = (genre) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
  };

  // Fetch movies when "Filter" button is clicked
  const fetchFilteredMovies = () => {
    setFetchTriggered(true);
  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient" className="flex gap-3 h-12">
        <FunnelIcon className="w-5 h-5" />
        <span>Filter</span>
      </Button>

      <Dialog
        open={open}
        size="lg"
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Filter Movies.</DialogHeader>

        <DialogBody>
          <div className="flex flex-wrap gap-x-4">
            <span className="roboto-bold mt-2">Genre:</span>
            {Object.keys(genreIdMap).map((genre) => (
              <div key={genre} className="flex">
                <Checkbox
                  color="blue"
                  checked={selectedGenres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                />
                <span className="mt-3 roboto-bold text-base">{genre}</span>
              </div>
            ))}
          </div>
        </DialogBody>

        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            className="flex gap-2"
            color="blue"
            onClick={() => {
              fetchFilteredMovies();
              handleOpen();
            }}
          >
            <MagnifyingGlassIcon className="w-4 h-4" />
            <span>Filter</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
