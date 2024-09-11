import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const FavSlice = createSlice({
    name: 'fav',
    initialState,
    reducers: {
        addToFav: (state, action) => {
            const movie = action.payload;
            const existingMovie = state.find(item => item.id === movie.id); 
            if (!existingMovie) {
                state.push(movie); // This works fine because Redux Toolkit allows mutable logic
            }
        },
        removeFromFav: (state, action) => {
            // Reassigning state explicitly, though returning works too
            const updatedState = state.filter(movie => movie.id !== action.payload);
            return updatedState;
        },
    }
});

export  const { addToFav, removeFromFav } = FavSlice.actions;

export default FavSlice.reducer;
