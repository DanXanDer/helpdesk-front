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
      state.status = "authenticated";
      state.usuario = {...action.payload};      
    },
  },
});

export const { setUsuarioLogin } = moduloSeguridadSlice.actions;

export default moduloSeguridadSlice.reducer;
