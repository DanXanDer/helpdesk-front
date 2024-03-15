import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "checking", // no-autenticado, autenticado, autenticando
  user: null /* {
    idUsuario: null,
    nombres: null,
    tipo: null,
    authorities: [],
  }, */,
};

export const moduloSeguridadSlice = createSlice({
  name: "moduloSeguridadSlice",
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
  moduloSeguridadSlice.actions;

export default moduloSeguridadSlice.reducer;
