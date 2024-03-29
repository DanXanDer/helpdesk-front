import { Navigate, Route, Routes } from "react-router-dom";
import {
  AutenticacionPage,
  CompletarDatosPage,
  ConfirmarDatosPage,
  PreguntaSeguridadPage,
  ReestablecerClavePage,
} from "../pages";

export const ModuloSeguridadRoutes = () => {

  return (
    <Routes>
      <Route path="/*" element={<Navigate to="/" />}></Route>
      <Route path="/" element={<AutenticacionPage />}></Route>
      <Route path="confirmar-datos" element={<ConfirmarDatosPage />}></Route>
      <Route
        path="pregunta-seguridad"
        element={<PreguntaSeguridadPage />}
      ></Route>
      <Route
        path="reestablecer-clave"
        element={<ReestablecerClavePage />}
      ></Route>
      <Route path="completar-datos" element={<CompletarDatosPage />}></Route>
    </Routes>
  );
};
