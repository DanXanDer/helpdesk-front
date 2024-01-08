import { Navigate, Route, Routes } from "react-router-dom";
import {
  IncidentesReportadosPage,
  MisTicketsPage,
  DetallesIncidentePage,
  DetallesTicketPage,
} from "../pages";
import { useModuloSeguridadStore, useUiStore } from "../../hooks";
import { useEffect } from "react";

//TODO: Correción de ruta de detalle de reporte de incidente y ticket
//TODO: Agregar funcionalidad para adjuntar imagenes en el intercambio de mensajes con el trabajador
export const ModuloTrabajadorRoutes = () => {
  const { handleActiveRoute } = useUiStore();
  const { usuario } = useModuloSeguridadStore();

  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentRoute = currentPath.split("/")[1];
    const { privilegios } = usuario;
    if (currentRoute === "incidentes-reportados") {
      handleActiveRoute(privilegios[0].idPrivilegio);
    } else if (currentRoute === "mis-tickets") {
      handleActiveRoute(privilegios[1].idPrivilegio);
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
        path="/incidentes-reportados/:incidenteId"
        element={<DetallesIncidentePage />}
      />
      <Route path="/mis-tickets/detalles" element={<DetallesTicketPage />} />
    </Routes>
  );
};
