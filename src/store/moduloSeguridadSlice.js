import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "no-autenticado", // no-autenticado, autenticado, autenticando
  usuario: {
    idUsuario: null,
    nombreUsuario: null,
    nombres: null,
    apellidos: null,
    privilegios: [],
  },
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
      state.status = initialState.status;
      state.usuario = { ...initialState.usuario };
    },
  },
});

export const { setUsuarioLogin, setUsuarioLogout } =
  moduloSeguridadSlice.actions;

export default moduloSeguridadSlice.reducer;
