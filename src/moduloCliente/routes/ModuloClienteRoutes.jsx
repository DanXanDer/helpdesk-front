import { Navigate, Route, Routes } from "react-router-dom";
import {
  ActualizarInformacionPage,
  MiReporteDetallesPage,
  MisReportesPage,
  ReportarIncidentePage,
} from "../pages";
import { useModuloSeguridadStore, useUiStore } from "../../hooks";
import { useEffect } from "react";

export const ModuloClienteRoutes = () => {
  const { handleActiveRoute } = useUiStore();
  const { user } = useModuloSeguridadStore();

  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentRoute = currentPath.split("/")[1];
    const { authorities } = user;
    if (currentRoute === "reportar-incidente") {
      handleActiveRoute(authorities[0].idPrivilege);
    } else if (currentRoute === "mis-reportes") {
      handleActiveRoute(authorities[1].idPrivilege);
    } else if (currentRoute === "actualizar-informacion") {
      handleActiveRoute(authorities[2].idPrivilege);
    }
  }, []);

  return (
    <Routes>
      <Route path="/*" element={<Navigate to="/reportar-incidente" />} />
      <Route
        path="actualizar-informacion"
        element={<ActualizarInformacionPage />}
      />
      <Route path="mis-reportes" element={<MisReportesPage />} />
      <Route path="reportar-incidente" element={<ReportarIncidentePage />} />
      <Route
        path="mis-reportes/:idReporteIncidente"
        element={<MiReporteDetallesPage />}
      />
    </Routes>
  );
};
