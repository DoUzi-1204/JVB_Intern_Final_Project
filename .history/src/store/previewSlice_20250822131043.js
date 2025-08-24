import { createSlice } from "@reduxjs/toolkit";

const previewSlice = createSlice({
  name: "preview",
  initialState: {},
  reducers: {
    setPreview: (state, action) => {
      const { id, data } = action.payload;
      state[id] = data;
    },
    clearPreview: (state, action) => {
      const { id } = action.payload;
      delete state[id];
    },
  },
});

export const { setPreview, clearPreview } = previewSlice.actions;
export default previewSlice.reducer;
