import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const filterResultSlice = createSlice({
  name: 'filterResult',
  initialState,
  
  reducers: {
    setFilterResult: (state, action) => {
      const movies = action.payload;
      return movies;  // Replace the state with the new filter result
    }
  }
});

export const { setFilterResult } = filterResultSlice.actions;
export default filterResultSlice.reducer;
