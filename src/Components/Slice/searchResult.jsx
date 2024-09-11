import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const searchResultSlice = createSlice({
  name: 'searchResult',
  initialState,
  
  reducers: {
    setSearchResult: (state, action) => {
      const movies = action.payload;
      return movies;  // Replace the state with the new search result
    }
  }
});

export const { setSearchResult } = searchResultSlice.actions;
export default searchResultSlice.reducer;
