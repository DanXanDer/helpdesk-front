import { Navigate, Route, Routes } from "react-router-dom";
import {
  MyReportDetailsPage,
  MyReportsPage,
  ReportPage,
} from "../pages";
import { useSecurityModelStore, useUiStore } from "../../hooks";
import { useEffect } from "react";
import { WelcomePage } from "../../moduloSeguridad/pages/WelcomePage";
import { getActiveRoute } from "../../helpers";
import { UserUpdatePage } from "../../ui/pages/UserUpdatePage";

export const ModuloClienteRoutes = () => {
  const { user: { authorities } } = useSecurityModelStore();
  const { handleActiveRoute } = useUiStore();
  useEffect(() => {
    const idPrivilege = getActiveRoute(authorities);
    handleActiveRoute(idPrivilege);
  })

  return (
    <Routes>
      <Route path="/*" element={<Navigate to="/bienvenida" />} />
      <Route
        path="actualizar-informacion"
        element={<UserUpdatePage />}
      />
      <Route path="mis-reportes" element={<MyReportsPage />} />
      <Route path="reportar-incidente" element={<ReportPage />} />
      <Route
        path="mis-reportes/:id"
        element={<MyReportDetailsPage />}
      />
      <Route path="/bienvenida" element={<WelcomePage />} />
    </Routes>
  );
};
