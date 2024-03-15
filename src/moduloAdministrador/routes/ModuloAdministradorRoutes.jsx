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
    const { authorities } = user;
    if (currentRoute === "gestionar-usuarios") {
      handleActiveRoute(authorities[0].idPrivilege);
    } else if (currentRoute === "crear-usuario") {
      handleActiveRoute(authorities[1].idPrivilege);
    } else if (currentRoute === "ver-tickets") {
      handleActiveRoute(authorities[2].idPrivilege);
    } else if (currentRoute === "agregar-empresa") {
      handleActiveRoute(authorities[3].idPrivilege);
    }
  }, []);

  return (
    <Routes>
      <Route path="/*" element={<Navigate to="/gestionar-usuarios" />} />
      <Route path="/gestionar-usuarios" element={<GestionarUsuariosPage />} />
      <Route path="/crear-usuario" element={<CrearUsuarioPage />} />
      <Route path="/ver-tickets" element={<VerTicketsPage />} />
      <Route path="/agregar-empresa" element={<AgregarEmpresaPage />} />
    </Routes>
  );
};
