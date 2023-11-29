import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mobileOpen: false,
};

export const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    setMobileOpen: (state) => {
      state.mobileOpen = !state.mobileOpen;
    },
  },
});

export const { setMobileOpen } = uiSlice.actions;

export default uiSlice.reducer;
