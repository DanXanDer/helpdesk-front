import { Navigate, Route, Routes } from "react-router-dom";
import {
  GenerarReportePage,
  IncidentesReportadosPage,
  MisTicketsPage,
  DetallesIncidentePage,
  DetallesTicketPage,
} from "../pages";
import { BienvenidaPage } from "../../moduloSeguridad/pages";

export const ModuloTrabajadorRoutes = () => {

  console.log("ModuloTrabajadorRoutes")
  return (
    <Routes>
      <Route path="/bienvenida" element={<BienvenidaPage />} />
      <Route path="/*" element={<Navigate to="/bienvenida" />} />
      <Route path="/generar-reporte" element={<GenerarReportePage />} />
      <Route
        path="incidentes-reportados"
        element={<IncidentesReportadosPage />}
      />
      <Route path="/mis-tickets" element={<MisTicketsPage />} />
      <Route
        path="/incidentes-reportados/detalles"
        element={<DetallesIncidentePage />}
      />
      <Route path="/mis-tickets/detalles" element={<DetallesTicketPage />} />
    </Routes>
  );
};
