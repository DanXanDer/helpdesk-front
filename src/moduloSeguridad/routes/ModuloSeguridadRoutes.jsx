import { Navigate, Route, Routes } from "react-router-dom";
import {
  AutenticacionPage,
  ConfirmarDatosPage,
  PreguntaSeguridadPage,
  ReestablecerClavePage,
} from "../pages";

export const ModuloSeguridadRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/autenticacion" />}></Route>
        <Route path="autenticacion" element={<AutenticacionPage />}></Route>
        <Route path="confirmar-datos" element={<ConfirmarDatosPage />}></Route>
        <Route
          path="pregunta-seguridad"
          element={<PreguntaSeguridadPage />}
        ></Route>
        <Route
          path="reestablecer-clave"
          element={<ReestablecerClavePage />}
        ></Route>
      </Routes>
    </div>
  );
};
