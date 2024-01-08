import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CrearUsuarioPage, GestionarUsuariosPage } from "../pages";
import { useModuloSeguridadStore, useUiStore } from "../../hooks";

//TODO: Agregar funcionalidad para que un administrador pueda visualizar el historial de tickets de sus subordinados
export const ModuloAdministradorRoutes = () => {
  const { handleActiveRoute } = useUiStore();
  const { usuario } = useModuloSeguridadStore();

  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentRoute = currentPath.split("/")[1];
    const { privilegios } = usuario;
    if (currentRoute === "gestionar-usuarios") {
      handleActiveRoute(privilegios[0].idPrivilegio);
    } else if (currentRoute === "crear-usuario") {
      handleActiveRoute(privilegios[1].idPrivilegio);
    }
  }, []);

  return (
    <Routes>
      <Route path="/*" element={<Navigate to="/gestionar-usuarios" />} />
      <Route path="/gestionar-usuarios" element={<GestionarUsuariosPage />} />
      <Route path="/crear-usuario" element={<CrearUsuarioPage />} />
    </Routes>
  );
};
