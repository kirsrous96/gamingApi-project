import { createSlice } from "@reduxjs/toolkit";

export const genreSlice = createSlice({
  name: "genres",
  initialState: {
    genres: []
  },
  reducers: {
    addGenre: (state, action) => {
      state.genres = [...state.genres, action.payload]
    },
    deleteGenre: (state, action) => {
        state.genres = state.genres.filter(function(el) { return el.genres !== action.payload }); 
      }
  },
});

export const { addGenre, deleteGenre,deleteAllGenres} = genreSlice.actions;

export const selectGenres = (state) => state.genre.genres;

export default genreSlice.reducer;