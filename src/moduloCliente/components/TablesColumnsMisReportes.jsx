import { useNavigate } from "react-router-dom";
import { Info } from "@mui/icons-material";
import { Button } from "@mui/material";
import api from "../../services/instance";

const columnOptions = {
  headerAlign: "left",
  align: "left",
  minWidth: 200,
};

export const TablesColumnsMisReportes = () => {
  const navigate = useNavigate();

  const columns = [
    {
      field: "nombreIncidente",
      headerName: "Incidente",
      flex: 1.2,
      ...columnOptions,
    },
    {
      field: "descripcion",
      headerName: "Descripcion",
      flex: 1.5,
      ...columnOptions,
    },
    {
      field: "fechaReporte",
      headerName: "Fecha reportada",
      ...columnOptions,
    },

    {
      field: "trabajador",
      headerName: "Trabajador asignado",
      ...columnOptions,
    },
    {
      field: "enabled",
      headerName: "Estado",
      ...columnOptions,
    },
    {
      field: "detalles",
      headerName: "Acción",
      ...columnOptions,
      renderCell: ({ row }) => {
        const handleMiReporteDetalles = () => {
          navigate(`${row.id}`);
        };

        const isEnEspera = row.enabled === "En espera";
        const isDisabled = isEnEspera;

        return (
          <Button
            variant="contained"
            startIcon={<Info />}
            onClick={handleMiReporteDetalles}
            disabled={isDisabled}
          >
            Abrir
          </Button>
        );
      },
    },
  ];

  return columns;
};
