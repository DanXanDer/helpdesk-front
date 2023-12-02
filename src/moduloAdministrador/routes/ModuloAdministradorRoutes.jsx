import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CrearUsuarioPage, GestionarUsuariosPage } from "../pages";
import { BienvenidaPage } from "../../moduloSeguridad/pages";

export const ModuloAdministradorRoutes = () => {
  return (
    <Routes>
      <Route path="bienvenida" element={<BienvenidaPage />} />
      <Route path="/*" element={<Navigate to="/bienvenida" />} />
      <Route path="gestionar-usuarios" element={<GestionarUsuariosPage />} />
      <Route
        path="gestionar-usuarios/crear-usuario"
        element={<CrearUsuarioPage />}
      />
    </Routes>
  );
};
