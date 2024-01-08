import { Navigate, Route, Routes } from "react-router-dom";
import {
  ActualizarInformacionPage,
  MiReporteDetallesPage,
  MisReportesPage,
  ReportarIncidentePage,
} from "../pages";
import { useModuloSeguridadStore, useUiStore } from "../../hooks";
import { useEffect } from "react";

//TODO: Correción de ruta de detalle de reporte de incidente
//TODO: Agregar funcionalidad para adjuntar imagenes en el intercambio de mensajes con el trabajador
//TODO: Agregar funcionalidad para permitir que un cliente gerente pueda visualizar el historial de tickets de sus subordinados
export const ModuloClienteRoutes = () => {
  const { handleActiveRoute } = useUiStore();
  const { usuario } = useModuloSeguridadStore();

  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentRoute = currentPath.split("/")[1];
    const { privilegios } = usuario;
    if (currentRoute === "reportar-incidente") {
      handleActiveRoute(privilegios[0].idPrivilegio);
    } else if (currentRoute === "mis-reportes") {
      handleActiveRoute(privilegios[1].idPrivilegio);
    } else if (currentRoute === "actualizar-informacion") {
      handleActiveRoute(privilegios[2].idPrivilegio);
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
      <Route path="mis-reportes/detalles" element={<MiReporteDetallesPage />} />
    </Routes>
  );
};
