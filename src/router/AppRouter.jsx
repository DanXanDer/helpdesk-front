import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ModuloSeguridadRoutes } from "../moduloSeguridad/routes";
import { useModuloSeguridadStore, useUiStore } from "../hooks";
import { ModuloTrabajadorRoutes } from "../moduloTrabajador/routes";
import { ModuloAdministradorRoutes } from "../moduloAdministrador/routes";
import { ModuloClienteRoutes } from "../moduloCliente/routes";
import { showAlertMessage } from "../helpers";
import { CheckingSesion } from "../ui/components";
import { MensajeSistemaPage } from "../ui/pages/MensajeSistemaPage";
import api from "../services/instance";

export const AppRouter = () => {
  const { status, user, handleUserLogin, handleUserLogout } = useModuloSeguridadStore();
  useModuloSeguridadStore();
  const { handleActiveRoute } = useUiStore();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
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
      } catch ({ response }) {
        const { message } = response.data;
        showAlertMessage("error", "Error", message);
      }
    };
    getUser();
  }, []);

  if (status === "checking") return <CheckingSesion />;

  return (
    <Routes>
      {user ? (
        <>
          {user.type === "Trabajador" && (
            <Route path="/*" element={<ModuloTrabajadorRoutes />} />
          )}
          {user.type === "Superadministrador" && (
            <Route path="/*" element={<ModuloAdministradorRoutes />} />
          )}
          {user.type === "Cliente" && (
            <Route path="/*" element={<ModuloClienteRoutes />} />
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
