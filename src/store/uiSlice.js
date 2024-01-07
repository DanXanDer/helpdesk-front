import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mobileOpen: false,
  activeRoute: null,
};

export const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    setMobileOpen: (state) => {
      state.mobileOpen = !state.mobileOpen;
    },
    setActiveRoute: (state, action) => {
      state.activeRoute = action.payload;
    },
  },
});

export const { setMobileOpen, setActiveRoute } = uiSlice.actions;

export default uiSlice.reducer;
