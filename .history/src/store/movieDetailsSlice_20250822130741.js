import { createSlice } from "@reduxjs/toolkit";

const movieDetailsSlice = createSlice({
	name: "movieDetails",
	initialState: {},
	reducers: {
		setMovieDetails: (state, action) => {
			const { movieId, data } = action.payload;
			state[movieId] = data;
		},
	},
});

export const { setMovieDetails } = movieDetailsSlice.actions;
export default movieDetailsSlice.reducer;
