import { useNavigate } from "react-router-dom";
import { Details } from "@mui/icons-material";
import { Button } from "@mui/material";
import api from "../../services/instance";

const columnOptions = {
  headerAlign: "left",
  align: "left",
  width: 250,
};

export const TablesColumnsMisReportes = () => {
  const navigate = useNavigate();

  const columns = [
    {
      field: "nombreIncidente",
      headerName: "Incidente",
      ...columnOptions,
    },
    {
      field: "descripcion",
      headerName: "Descripcion",
      ...columnOptions,
    },
    {
      field: "nivel",
      headerName: "Nivel",
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
      field: "estado",
      headerName: "Estado",
      ...columnOptions,
    },
    {
      field: "fechaCreacion",
      headerName: "Fecha de creacion ticket",
      ...columnOptions,
    },
    {
      field: "detalles",
      headerName: "Ver detalles",
      ...columnOptions,
      renderCell: ({ row }) => {
        const handleMiReporteDetalles = async () => {
          try {
            const {data} = await api.get(`/modulo-cliente/reportes/${row.id}`);
            navigate("detalles", {
              state: data,
            });
          } catch (error) {
            const { mensaje } = error.response.data.error;
            showAlertMessage("error", "Error", mensaje);
          }
        };

        const isEnEspera = row.estado === "En espera";
        const isDisabled = isEnEspera;

        return (
          <Button
            variant="contained"
            startIcon={<Details />}
            onClick={handleMiReporteDetalles}
            disabled={isDisabled}
          >
            Detalles
          </Button>
        );
      },
    },
  ];

  return columns;
};
