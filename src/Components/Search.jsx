import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";  // Import useDispatch from react-redux
import { Button, Input } from "@material-tailwind/react";
import { useSearchMoviesQuery } from "./Slice/apiSlice";
import { setSearchResult } from "./Slice/searchResult"; // Import your action

export default function Search() {
  // State to hold the search keyword entered by the user
  const [searchTerm, setSearchTerm] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);
  const dispatch = useDispatch(); // Initialize the dispatch

  // Query the API when the search term is provided
  const { data } = useSearchMoviesQuery(searchTerm, {
    skip: !triggerSearch,  // This prevents the query from firing until search is triggered
  });

  // Handle search trigger
  const handleSearch = () => {
    if (searchTerm) {
      setTriggerSearch(true); // Trigger the search query
    }
  };

  // Use useEffect to dispatch the search results to Redux when data is fetched
  useEffect(() => {
    if (data && data.results.length > 0) {
      dispatch(setSearchResult(data.results)); // Dispatch the search result to the Redux store
    }
  }, [data, dispatch]);

  return (
    <>
      <div className="relative mr-3 md:mr-0 flex w-full gap-2 md:w-max">
        <Input
          type="search"
          color="white"
          label="Type here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term as user types
          className="pr-20"
          containerProps={{
            className: "min-w-[288px]",
          }}
        />
        <Button
          size="sm"
          color="white"
          className="!absolute right-3 top-1 rounded"
          onClick={handleSearch}  // Trigger the search on button click
        >
          Search
        </Button>
      </div>


    </>
  );
}
