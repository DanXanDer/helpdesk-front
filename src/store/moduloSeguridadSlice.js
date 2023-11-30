import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "checking", // no-autenticado, autenticado, autenticando
  usuario: null /* {
    idUsuario: null,
    nombres: null,
    tipo: null,
    privilegios: [],
  }, */,
};

export const moduloSeguridadSlice = createSlice({
  name: "moduloSeguridadSlice",
  initialState,
  reducers: {
    setUsuarioLogin: (state, action) => {
      state.status = "autenticado";
      state.usuario = { ...action.payload };
    },
    setUsuarioLogout: (state) => {
      state.status = "no-autenticado";
      state.usuario = null;
    },
  },
});

export const { setUsuarioLogin, setUsuarioLogout } =
  moduloSeguridadSlice.actions;

export default moduloSeguridadSlice.reducer;
