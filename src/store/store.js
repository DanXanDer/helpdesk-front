import { configureStore } from "@reduxjs/toolkit";
import uiSliceReducer from "./uiSlice";
import moduloSeguridadReducer from "./moduloSeguridadSlice";

export const store = configureStore({
  reducer: {
    uiSlice: uiSliceReducer,
    moduloSeguridadSlice: moduloSeguridadReducer,
  },
});
