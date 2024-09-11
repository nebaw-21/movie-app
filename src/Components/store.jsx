import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './Slice/apiSlice';  // Make sure this is correctly imported
import FavSlice from "./Slice/addToFav";
import searchResultSlice from "./Slice/searchResult"
import filterResultSlice from "./Slice/filterResult";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, 
    fav: FavSlice,
    search:searchResultSlice,
    filter:filterResultSlice,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(apiSlice.middleware),  // Correctly add RTK Query middleware
});


export default store;
