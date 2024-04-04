import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ModuloSeguridadRoutes } from "../moduloSeguridad/routes";
import { useSecurityModelStore, useUiStore } from "../hooks";
import { WorkerModuleRoutes } from "../moduloTrabajador/routes";
import { AdminModuleRoutes } from "../moduloAdministrador/routes";
import { ClientModuleRoutes } from "../moduloCliente/routes";
import { showAlertMessage } from "../helpers";
import { CheckingSesion } from "../ui/components";
import { MensajeSistemaPage } from "../ui/pages/MensajeSistemaPage";
import api from "../services/instance";

export const AppRouter = () => {
  const { status, user, handleUserLogin, handleUserLogout } = useSecurityModelStore();
  useSecurityModelStore();
  const { handleActiveRoute } = useUiStore();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data: isAuthenticated } = await api.get("/home/check-login");
        if (!!isAuthenticated) {
          const { data } = await api.get("/home/active-user");
          handleUserLogin(data);
        } else {
          handleActiveRoute(null);
          handleUserLogout();
          navigate("/")
        }
      } catch (error) {
        showAlertMessage("error", "Error", "Ha ocurrido un error inesperado");
      }
    })();
  }, []);

  if (status === "checking") return <CheckingSesion />;

  return (
    <Routes>
      {user ? (
        <>
          {user.role === "Trabajador" && (
            <Route path="/*" element={<WorkerModuleRoutes />} />
          )}
          {user.role === "Administrador" && (
            <Route path="/*" element={<AdminModuleRoutes />} />
          )}
          {user.role === "Cliente" && (
            <Route path="/*" element={<ClientModuleRoutes />} />
          )}
        </>
      ) : (
        <>
          <Route path="/mensaje-sistema" element={<MensajeSistemaPage />} />
          <Route path="/*" element={<ModuloSeguridadRoutes />} />
        </>
      )}
    </Routes>
  );
};
