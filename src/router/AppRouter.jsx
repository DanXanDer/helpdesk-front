import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ModuloSeguridadRoutes } from "../moduloSeguridad/routes";
import { useModuloSeguridadStore } from "../hooks";
import { ModuloTrabajadorRoutes } from "../moduloTrabajador/routes";
import { ModuloAdministradorRoutes } from "../moduloAdministrador/routes";
import { ModuloClienteRoutes } from "../moduloCliente/routes";
import { axiosGetRequest, showAlertMessage } from "../helpers";
import { CheckingSesion } from "../ui/components";

const apiUrl = "http://localhost:8080/api/seguridad";

export const AppRouter = () => {

  const { status, usuario, handleUsuarioLogin, handleUsuarioLogout } = useModuloSeguridadStore();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axiosGetRequest(`${apiUrl}/usuario-activo`);
        if (data.idUsuario !== 0) {
          handleUsuarioLogin(data);
        }
        else{
          handleUsuarioLogout();
        }
      } catch (error) {
        const { mensaje } = error.response.data.error;
        showAlertMessage("error", "Error", mensaje);
      }
    };
    getUser();
  }, [status]);

  if(status === "checking") return (<CheckingSesion/>);

  return (
    <Routes>
      {usuario ? (
        <>
          {usuario.tipo === "trabajador" && (
            <Route path="/*" element={<ModuloTrabajadorRoutes />} />
          )}
          {usuario.tipo === "administrador" && (
            <Route path="/*" element={<ModuloAdministradorRoutes />} />
          )}
          {usuario.tipo === "cliente" && (
            <Route path="/*" element={<ModuloClienteRoutes />} />
          )}
        </>
      ) : (
        <Route path="/*" element={<ModuloSeguridadRoutes />} />
      )}
    </Routes>
  );
};
