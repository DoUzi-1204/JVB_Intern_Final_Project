import { configureStore } from "@reduxjs/toolkit";
import movieDetailsReducer from "./movieDetailsSlice";
import tvDetailsReducer from "./tvDetailsSlice";
// ...other reducers...

const store = configureStore({
  reducer: {
    movieDetails: movieDetailsReducer,
    tvDetails: tvDetailsReducer,
    // ...other reducers...
  },
});

export default store;
