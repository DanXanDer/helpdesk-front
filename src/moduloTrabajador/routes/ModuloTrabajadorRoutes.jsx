import { Navigate, Route, Routes } from "react-router-dom";
import {
  MisTicketsPage,
  DetallesIncidentePage,
  DetallesTicketPage,
} from "../pages";
import { useSecurityModelStore, useUiStore } from "../../hooks";
import { useEffect } from "react";
import { WelcomePage } from "../../moduloSeguridad/pages";

export const ModuloTrabajadorRoutes = () => {
  const { handleActiveRoute } = useUiStore();
  const { user } = useSecurityModelStore();

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
      <Route path="/*" element={<Navigate to="/bienvenida" />} />
      <Route path="/mis-tickets" element={<MisTicketsPage />} />
      <Route
        path="/incidentes-reportados/:idReporteIncidente"
        element={<DetallesIncidentePage />}
      />
      <Route path="/mis-tickets/:idTicket" element={<DetallesTicketPage />} />
      <Route path="/bienvenida" element={<WelcomePage/>} />
    </Routes>
  );
};
