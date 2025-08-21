import { createSlice } from "@reduxjs/toolkit";

const tvDetailsSlice = createSlice({
  name: "tvDetails",
  initialState: {},
  reducers: {
    setTvDetails: (state, action) => {
      const { tvId, data } = action.payload;
      state[tvId] = data;
    },
  },
});

export const { setTvDetails } = tvDetailsSlice.actions;
export default tvDetailsSlice.reducer;