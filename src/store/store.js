import { configureStore } from "@reduxjs/toolkit";
import uiSliceReducer from "./uiSlice";
import moduloSeguridadReducer from "./securityModelSlice";

export const store = configureStore({
  reducer: {
    uiSlice: uiSliceReducer,
    securityModelSlice: moduloSeguridadReducer,
  },
});
