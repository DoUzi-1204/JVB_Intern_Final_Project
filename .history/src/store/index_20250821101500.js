import { configureStore } from "@reduxjs/toolkit";
import movieDetailsReducer from "./movieDetailsSlice";
// ...import other reducers if needed...

const store = configureStore({
  reducer: {
    movieDetails: movieDetailsReducer,
    // ...other reducers...
  },
});

export default store;
