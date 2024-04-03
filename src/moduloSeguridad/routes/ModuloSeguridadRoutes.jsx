import { Navigate, Route, Routes } from "react-router-dom";
import {
  LoginPage,
  CompleteUserDataPage,
  ValidateUserDataPage,
  ValidateUserSecretQuestionPage,
  ReestablecerClavePage,
} from "../pages";

export const ModuloSeguridadRoutes = () => {

  return (
    <Routes>
      <Route path="/*" element={<Navigate to="/" />}></Route>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="confirmar-datos" element={<ValidateUserDataPage />}></Route>
      <Route
        path="pregunta-seguridad"
        element={<ValidateUserSecretQuestionPage />}
      ></Route>
      <Route
        path="reestablecer-clave"
        element={<ReestablecerClavePage />}
      ></Route>
      <Route path="completar-datos" element={<CompleteUserDataPage />}></Route>
    </Routes>
  );
};
