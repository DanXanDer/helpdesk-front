import { Navigate, Route, Routes } from "react-router-dom";
import {
  TicketsPage,
  TicketDetailsPage,
} from "../pages";
import { useSecurityModelStore, useUiStore } from "../../hooks";
import { useEffect } from "react";
import { WelcomePage } from "../../moduloSeguridad/pages";
import { getActiveRoute } from "../../helpers";

export const WorkerModuleRoutes = () => {
  const { handleActiveRoute } = useUiStore();
  const { user: { authorities } } = useSecurityModelStore();

  useEffect(() => {
    const currentPath = window.location.pathname;
    const idPrivilege = getActiveRoute(authorities);
    handleActiveRoute(idPrivilege);
  }, []);

  return (
    <Routes>
      <Route path="/*" element={<Navigate to="/bienvenida" />} />
      <Route path="/tickets" element={<TicketsPage />} />
      <Route path="/tickets/:id" element={<TicketDetailsPage />} />
      <Route path="/bienvenida" element={<WelcomePage />} />
    </Routes>
  );
};
