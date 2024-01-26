import { Details, Info } from "@mui/icons-material";
import { Button } from "@mui/material";
import { showAlertMessage } from "../../helpers";
import { useNavigate } from "react-router-dom";
import api from "../../services/instance";

const columnOptions = {
  headerAlign: "left",
  align: "left",
  minWidth: 200,
};

export const TableColumnsIncidentes = () => {
  const navigate = useNavigate();

  const columns = [
    {
      field: "datosCliente",
      headerName: "Cliente",
      flex: 1.1,
      ...columnOptions,
    },
    {
      field: "nombreIncidente",
      headerName: "Incidente",
      flex: 1.1,
      ...columnOptions,
    },
    {
      field: "nombreEmpresa",
      headerName: "Empresa",
      ...columnOptions
    },
    {
      field: "nombreSede",
      headerName: "Sede",
      ...columnOptions
    },
    {
      field: "nombreArea",
      headerName: "Área",
      ...columnOptions
    },
    {
      field: "fecha",
      headerName: "Fecha",
      flex: 1.1,
      ...columnOptions,
    },
    {
      field: "detalles",
      headerName: "Acción",
      ...columnOptions,
      renderCell: ({ row }) => {
        const handleReporteDetalles = () => {
          navigate(`${row.id}`);
        };
        return (
          <Button
            variant="contained"
            startIcon={<Info />}
            onClick={handleReporteDetalles}
          >
            Abrir
          </Button>
        );
      },
    },
  ];

  return columns;
};
