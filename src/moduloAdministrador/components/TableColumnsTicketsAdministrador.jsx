import { Info } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const columnOptions = {
  headerAlign: "left",
  align: "left",
  minWidth: 200,
};

export const TableColumnsTicketsAdministrador = () => {
  const columns = [
    {
      field: "client",
      headerName: "Cliente",
      flex: 1,
      ...columnOptions,
    },
    {
      field: "trabajador",
      headerName: "Trabajador",
      flex: 1,
      ...columnOptions,
    },
    {
      field: "nombreIncidente",
      headerName: "Incidente",
      flex: 1.2,
      ...columnOptions,
    },
    {
      field: "enabled",
      headerName: "Estado",
      flex: 1,
      ...columnOptions,
    },
    {
      field: "name",
      headerName: "Empresa",
      flex: 1,
      ...columnOptions,
    },
    {
      field: "name",
      headerName: "Sede",
      flex: 1,
      ...columnOptions,
    },
    {
      field: "name",
      headerName: "Area",
      flex: 1,
      ...columnOptions,
    },
    {
      field: "reporteFechaFormateada",
      flex: 1.1,
      headerName: "Fecha de reporte",
      ...columnOptions,
    },
    {
      field: "ticketFechaFormateada",
      flex: 1.1,
      headerName: "Fecha de creación de ticket",
      ...columnOptions,
    }
  ];

  return columns;
};
