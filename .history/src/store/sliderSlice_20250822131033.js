import { createSlice } from "@reduxjs/toolkit";

const sliderSlice = createSlice({
  name: "slider",
  initialState: {},
  reducers: {
    setSliderData: (state, action) => {
      const { endpoint, data } = action.payload;
      state[endpoint] = data;
    },
    clearSliderData: (state, action) => {
      const { endpoint } = action.payload;
      delete state[endpoint];
    },
  },
});

export const { setSliderData, clearSliderData } = sliderSlice.actions;
export default sliderSlice.reducer;
