import { configureStore } from "@reduxjs/toolkit";
import tvDetailsReducer from "./tvDetailsSlice";
import movieDetailsReducer from "./movieDetailsSlice";
import sliderReducer from "./sliderSlice";
import previewReducer from "./previewSlice";

const store = configureStore({
  reducer: {
    tvDetails: tvDetailsReducer,
    movieDetails: movieDetailsReducer,
  slider: sliderReducer,
  preview: previewReducer,
  },
});

export default store;
