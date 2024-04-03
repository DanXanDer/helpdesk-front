import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  ManageUsersPage,
  AllTicketsPage,
  CompaniesPage,
  BranchesPage
} from "../pages";
import { useSecurityModelStore, useUiStore } from "../../hooks";
import { WelcomePage } from "../../moduloSeguridad/pages/WelcomePage";
import { getActiveRoute } from "../../helpers";
import { UserUpdatePage } from "../../ui/pages";

export const ModuloAdministradorRoutes = () => {
  const { handleActiveRoute } = useUiStore();
  const { user: { authorities } } = useSecurityModelStore();
  useEffect(() => {
    const idPrivilege = getActiveRoute(authorities);
    handleActiveRoute(idPrivilege);
  }, []);

  return (
    <Routes>
      <Route path="/*" element={<Navigate to="/bienvenida" />} />
      <Route path="/usuarios" element={<ManageUsersPage />} />
      <Route path="/historial-tickets" element={<AllTicketsPage />} />
      <Route path="/empresas" element={<CompaniesPage />} />
      <Route path="/empresas/:id" element={<BranchesPage />} />
      <Route path="/bienvenida" element={<WelcomePage />} />
      <Route path="/actualizar-informacion" element={<UserUpdatePage />} />
    </Routes>
  );
};
