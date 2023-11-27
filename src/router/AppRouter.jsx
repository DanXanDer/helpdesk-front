import React from "react";
import { Route, Routes } from "react-router-dom";
import { ModuloSeguridadRoutes } from "../moduloSeguridad/routes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<ModuloSeguridadRoutes />}></Route>
    </Routes>
  );
};
