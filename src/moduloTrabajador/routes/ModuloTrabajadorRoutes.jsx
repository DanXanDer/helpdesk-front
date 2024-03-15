import { Navigate, Route, Routes } from "react-router-dom";
import {
  IncidentesReportadosPage,
  MisTicketsPage,
  DetallesIncidentePage,
  DetallesTicketPage,
} from "../pages";
import { useModuloSeguridadStore, useUiStore } from "../../hooks";
import { useEffect } from "react";

export const ModuloTrabajadorRoutes = () => {
  const { handleActiveRoute } = useUiStore();
  const { user } = useModuloSeguridadStore();

  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentRoute = currentPath.split("/")[1];
    const { authorities } = user;
    if (currentRoute === "incidentes-reportados") {
      handleActiveRoute(authorities[0].idPrivilege);
    } else if (currentRoute === "mis-tickets") {
      handleActiveRoute(authorities[1].idPrivilege);
    }
  }, []);

  return (
    <Routes>
      <Route path="/*" element={<Navigate to="/incidentes-reportados" />} />
      <Route
        path="incidentes-reportados"
        element={<IncidentesReportadosPage />}
      />
      <Route path="/mis-tickets" element={<MisTicketsPage />} />
      <Route
        path="/incidentes-reportados/:idReporteIncidente"
        element={<DetallesIncidentePage />}
      />
      <Route path="/mis-tickets/:idTicket" element={<DetallesTicketPage />} />
    </Routes>
  );
};
