import { Route, Routes } from "react-router-dom";
import {
  ActualizarInformacionPage,
  MisReportesPage,
  ReportarIncidentePage,
} from "../pages";

export const ModuloClienteRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<Navigate to="/bienvenida" />} />
      <Route path="bienvenida" element={<BienvenidaPage />} />
      <Route
        path="actualizar-informacion"
        element={<ActualizarInformacionPage />}
      />
      <Route path="mis-reportes" element={<MisReportesPage />} />
      <Route path="reportar-incidente" element={<ReportarIncidentePage />} />
    </Routes>
  );
};
