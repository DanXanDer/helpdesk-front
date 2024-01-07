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
  const { status, usuario, handleUsuarioLogin, handleUsuarioLogout } =
    useModuloSeguridadStore();

  const { handleActiveRoute } = useUiStore();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await api.get("/seguridad/usuario-activo");
        if (data.idUsuario !== 0) {
          handleUsuarioLogin(data);
        } else {
          handleActiveRoute(null);
          handleUsuarioLogout();
        }
      } catch (error) {
        const { mensaje } = error.response.data.error;
        showAlertMessage("error", "Error", mensaje);
      }
    };
    getUser();
  }, [status]);

  if (status === "checking") return <CheckingSesion />;

  return (
    <Routes>
      {usuario ? (
        <>
          {usuario.tipo === "Trabajador" && (
            <Route path="/*" element={<ModuloTrabajadorRoutes />} />
          )}
          {usuario.tipo === "Administrador" && (
            <Route path="/*" element={<ModuloAdministradorRoutes />} />
          )}
          {usuario.tipo === "Cliente" && (
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
