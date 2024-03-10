import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  AgregarEmpresaPage,
  CrearUsuarioPage,
  GestionarUsuariosPage,
  VerTicketsPage,
} from "../pages";
import { useModuloSeguridadStore, useUiStore } from "../../hooks";

export const ModuloAdministradorRoutes = () => {
  const { handleActiveRoute } = useUiStore();
  const { user } = useModuloSeguridadStore();

  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentRoute = currentPath.split("/")[1];
    const { privilegios } = user;
    if (currentRoute === "gestionar-usuarios") {
      handleActiveRoute(privilegios[0].idPrivilegio);
    } else if (currentRoute === "crear-user") {
      handleActiveRoute(privilegios[1].idPrivilegio);
    } else if (currentRoute === "ver-tickets") {
      handleActiveRoute(privilegios[2].idPrivilegio);
    } else if (currentRoute === "agregar-empresa") {
      handleActiveRoute(privilegios[3].idPrivilegio);
    }
  }, []);

  return (
    <Routes>
      <Route path="/*" element={<Navigate to="/gestionar-usuarios" />} />
      <Route path="/gestionar-usuarios" element={<GestionarUsuariosPage />} />
      <Route path="/crear-user" element={<CrearUsuarioPage />} />
      <Route path="/ver-tickets" element={<VerTicketsPage />} />
      <Route path="/agregar-empresa" element={<AgregarEmpresaPage />} />
    </Routes>
  );
};
