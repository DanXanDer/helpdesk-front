import { Details, Info } from "@mui/icons-material";
import { Button } from "@mui/material";
import { showAlertMessage } from "../../helpers";
import { useNavigate } from "react-router-dom";
import api from "../../services/instance";

const columnOptions = {
  headerAlign: "left",
  align: "left",
  width: 200,
};

export const TableColumnsIncidentes = () => {
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
      flex: 1.2,
      ...columnOptions,
    },
    {
      field: "fecha",
      headerName: "Fecha",
      ...columnOptions,
    },
    {
      field: "detalles",
      headerName: "Acción",
      ...columnOptions,
      renderCell: ({ row }) => {
        const handleReporteDetalles = async () => {
          try {
            const { data } = await api.get(
              `/modulo-trabajador/reportes-incidentes/${row.id}`
            );
            navigate(`${row.id}`, {
              state: data,
            });
          } catch (error) {
            const { mensaje } = error.response.data.error;
            showAlertMessage("error", "Error", mensaje);
          }
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
