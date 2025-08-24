import { configureStore } from "@reduxjs/toolkit";
import tvDetailsReducer from "./tvDetailsSlice";
import movieDetailsReducer from "./movieDetailsSlice";

const store = configureStore({
  reducer: {
    tvDetails: tvDetailsReducer,
    movieDetails: movieDetailsReducer,
  },
});

export default store;
