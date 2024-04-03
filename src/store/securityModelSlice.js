import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "checking", // no-autenticado, autenticado, autenticando
  user: null /* {
    idUsuario: null,
    name: null,
    tipo: null,
    authorities: [],
  }, */,
};

export const securityModelSlice = createSlice({
  name: "securityModelSlice",
  initialState,
  reducers: {
    setUserLogin: (state, action) => {
      state.status = "autenticado";
      state.user = { ...action.payload };
    },
    setUserLogout: (state) => {
      state.status = "no-autenticado";
      state.user = null;
    },
  },
});

export const { setUserLogin, setUserLogout } =
  securityModelSlice.actions;

export default securityModelSlice.reducer;
