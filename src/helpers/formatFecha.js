import React from "react";

export const formatFecha = (fecha) => {
  const fechaFormateada = new Date(fecha).toLocaleString("es-ES");

  return fechaFormateada;
};
