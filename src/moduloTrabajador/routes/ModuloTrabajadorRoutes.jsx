import { Navigate, Route, Routes } from "react-router-dom";
import {
  GenerarReportePage,
  IncidentesReportadosPage,
  MisTicketsPage,
} from "../pages";
import { BienvenidaPage } from "../../moduloSeguridad/pages";

export const ModuloTrabajadorRoutes = () => {
  return (
    <Routes>
      <Route path="bienvenida" element={<BienvenidaPage />} />
      <Route path="/*" element={<Navigate to="/bienvenida" />} />
      <Route path="generar-reporte" element={<GenerarReportePage />} />
      <Route
        path="incidentes-reportados"
        element={<IncidentesReportadosPage />}
      />
      <Route path="mis-tickets" element={<MisTicketsPage />} />
    </Routes>
  );
};
